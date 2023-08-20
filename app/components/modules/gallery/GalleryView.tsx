'use client';

import * as React from 'react';

import { GalleryImage } from './GalleryImage';
import { useGallery } from 'hooks';

export const GalleryView = () => {
  const { activeImages, nextImages } = useGallery();

  return (
    <div className="grow grid grid-cols-6 grid-rows-1 gap-10 align-center aspect-video overflow-hidden">
      {activeImages.map((image) => (
        <GalleryImage key={image.title} isActive {...{ image }} />
      ))}
      {nextImages.map((image) => (
        <GalleryImage key={image.title} {...{ image }} />
      ))}
    </div>
  );
};
