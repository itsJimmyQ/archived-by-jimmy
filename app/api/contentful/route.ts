import { NextResponse } from 'next/server';
import { ImageContentType } from 'types';

import * as Contentful from 'contentful';

import { convertEntryToImageObj } from 'services/convertEntryToImageObj';

export const GET = async () => {
  const client = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN!,
  });

  const entries = await client.getEntries<ImageContentType>({}).then((res) => res.items);
  const lastUpdatedAt = entries.sort((entryA, entryB) =>
    new Date(entryA.sys.createdAt) < new Date(entryB.sys.createdAt) ? 1 : -1,
  )[0].sys.createdAt;
  const images = entries.map(convertEntryToImageObj);

  return NextResponse.json({ results: images, last_updated_at: lastUpdatedAt });
};
