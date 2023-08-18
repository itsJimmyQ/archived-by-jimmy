'use client';

import * as React from 'react';

import { GalleryImage } from './GalleryImage';
import { useGallery } from 'hooks';

export const GalleryView = () => {
  const { activeImages, nextImages } = useGallery();

  return (
    <div className="w-auto max-w-full flex-grow grid grid-cols-4 grid-rows-1 gap-4 mx-auto aspect-video">
      {activeImages.map((image) => (
        <GalleryImage key={image.title} isActive {...{ image }} />
      ))}
      {nextImages.map((image) => (
        <GalleryImage key={image.title} {...{ image }} />
      ))}
    </div>
  );
};
