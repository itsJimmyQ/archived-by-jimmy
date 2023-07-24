import { ImageContentType } from 'types';
import { NextResponse } from 'next/server';
import * as Contentful from 'contentful';
import { convertEntryToImageObj } from 'services/convertEntryToImageObj';

export const GET = async () => {
  const client = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN!,
  });

  const entries = await client.getEntries<ImageContentType>({}).then((res) => res.items);
  const images = entries.map(convertEntryToImageObj).sort(() => (Math.random() <= 0.5 ? 1 : -1));

  return NextResponse.json({ results: images });
};
