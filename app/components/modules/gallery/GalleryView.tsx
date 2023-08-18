'use client';

import * as React from 'react';

import { GalleryImage } from './GalleryImage';
import { useGallery } from 'hooks';
import { Button } from 'common/interactions';

export const GalleryView = () => {
  const { activeImages, onShuffleImages, nextImages } = useGallery();

  return (
    <>
      <div className="w-auto max-w-full h-full grid grid-cols-4 grid-rows-1 gap-4 mx-auto aspect-video">
        {activeImages.map((image) => (
          <GalleryImage key={image.title} isActive {...{ image }} />
        ))}
        {nextImages.map((image) => (
          <GalleryImage key={image.title} {...{ image }} />
        ))}
      </div>
      <Button className="absolute left-[50%] -translate-x-[50%]" onClick={onShuffleImages}>
        Refresh
      </Button>
    </>
  );
};
