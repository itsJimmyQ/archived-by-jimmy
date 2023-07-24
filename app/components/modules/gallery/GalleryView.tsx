'use client';

import * as React from 'react';

import { GalleryImage } from './GalleryImage';
import { useGallery } from 'hooks';

export const GalleryView = () => {
  const { images } = useGallery();

  console.log(images);

  return (
    <div className="w-auto max-w-full h-full grid grid-cols-4 grid-rows-2 gap-4 mx-auto aspect-[1.375]">
      <GalleryImage src="https://picsum.photos/800/1200" alt="alt text" orientation="portrait" />
      <GalleryImage src="https://picsum.photos/1120/800" alt="alt text" orientation="landscape" />
      <GalleryImage src="https://picsum.photos/800/1200" alt="alt text" orientation="portrait" />
      <GalleryImage src="https://picsum.photos/800/1200" alt="alt text" orientation="portrait" />
      <GalleryImage src="https://picsum.photos/800/1200" alt="alt text" orientation="portrait" />
      <GalleryImage src="https://picsum.photos/1120/800" alt="alt text" orientation="landscape" />
    </div>
  );
};
