import { FormattedImage, ImageContentType } from 'types';
import * as Contentful from 'contentful';

export const convertEntryToImageObj = (entry: Contentful.Entry<ImageContentType>) => {
  return {
    title: entry.fields.title || 'Untitled',
    //@ts-ignore
    src: entry.fields.asset.fields.file.url,
    orientation: (entry.fields.orientation as string).toLowerCase(),
  } as FormattedImage;
};
