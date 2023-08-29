'use client';

import * as React from 'react';

import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

export const GalleryView = () => {
  const { activeImages, nextImages, isReady } = useGallery();

  return (
    <div className="grow grid grid-cols-5 grid-rows-1 gap-6 aspect-video overflow-hidden px-32">
      {isReady &&
        activeImages.map((image) => <GalleryImage key={image.src} isActive {...{ image }} />)}
      {isReady && nextImages.map((image) => <GalleryImage key={image.src} {...{ image }} />)}
    </div>
  );
};
