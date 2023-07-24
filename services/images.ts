import * as i from 'types';

export const dimensions = {
  landscape: {
    width: 1680,
    height: 1200,
    columns: 2,
  },
  portrait: {
    width: 800,
    height: 1200,
    columns: 1,
  },
  square: {
    width: 1200,
    height: 1200,
    columns: 2,
  },
};

// Mock data
const imageSrcPortrait = `https://picsum.photos/${dimensions.portrait.width}/${dimensions.portrait.height}`;
const imageSrcLandscape = `https://picsum.photos/${dimensions.landscape.width}/${dimensions.landscape.height}`;
const imageSrcSqaure = `https://picsum.photos/${dimensions.square.width}/${dimensions.square.height}`;

export const mockImages: i.GalleryImage[] = [
  {
    src: imageSrcPortrait,
    alt: 'Portrait image',
    orientation: 'portrait',
  },
  {
    src: imageSrcPortrait,
    alt: 'Portrait image',
    orientation: 'portrait',
  },
  {
    src: imageSrcPortrait,
    alt: 'Portrait image',
    orientation: 'portrait',
  },
  {
    src: imageSrcPortrait,
    alt: 'Portrait image',
    orientation: 'portrait',
  },
  {
    src: imageSrcLandscape,
    alt: 'Landscale image',
    orientation: 'landscape',
  },
  {
    src: imageSrcLandscape,
    alt: 'Landscale image',
    orientation: 'landscape',
  },
  {
    src: imageSrcLandscape,
    alt: 'Landscale image',
    orientation: 'landscape',
  },
  {
    src: imageSrcLandscape,
    alt: 'Landscale image',
    orientation: 'landscape',
  },
  {
    src: imageSrcSqaure,
    alt: 'Square image',
    orientation: 'square',
  },
  {
    src: imageSrcSqaure,
    alt: 'Square image',
    orientation: 'square',
  },
  {
    src: imageSrcSqaure,
    alt: 'Square image',
    orientation: 'square',
  },
  {
    src: imageSrcSqaure,
    alt: 'Square image',
    orientation: 'square',
  },
];
