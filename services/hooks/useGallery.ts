import * as i from 'types';
import * as React from 'react';

import { mockImages } from 'services/images';

const amountColumns = 4;

export const useGallery = () => {
  const [imagesTop, setImagesTop] = React.useState<GalleryImage[]>([]);
  const [imagesBottom, setImagesBottom] = React.useState<GalleryImage[]>([]);

  React.useEffect(() => {
    const amountImages = mockImages.length;
    const randomIndex = Math.floor(Math.random() * amountImages);
  }, []);
};

export type GalleryImage = {
  src: string;
  alt: string;
  orientation: i.GalleryImageOrientation;
};

export type GalleryImageOrientation = 'landscape' | 'portrait' | 'square';
