import * as Contentful from 'contentful';

export type ImageContentType = {
  contentTypeId: 'image';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    asset: Contentful.EntryFieldTypes.AssetLink;
    orientation: Contentful.EntryFieldTypes.Text;
  };
};

export type FormattedImage = {
  title: string;
  src: string;
  orientation: GalleryImageOrientation;
};

export type GalleryImageOrientation = 'Landscape' | 'portrait' | 'square';
