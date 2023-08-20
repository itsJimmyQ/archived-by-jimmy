'use client';

import * as React from 'react';

import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

export const GalleryView = () => {
  const { activeImages, nextImages } = useGallery();

  return (
    <div className="grow grid grid-cols-6 grid-rows-1 gap-10 aspect-video overflow-hidden">
      {activeImages.map((image) => (
        <GalleryImage key={image.title} isActive {...{ image }} />
      ))}
      {nextImages.map((image) => (
        <GalleryImage key={image.title} {...{ image }} />
      ))}
    </div>
  );
};
