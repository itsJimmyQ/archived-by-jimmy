'use client';

import * as React from 'react';

import { GalleryImage } from './GalleryImage';
import { useGallery } from 'hooks';

export const GalleryView = () => {
  const { activeTopImages, activeBottomImages, onShuffleImages, progress } = useGallery();

  if (progress < 100) return null;

  return (
    <div className="w-auto max-w-full h-full grid grid-cols-4 grid-rows-2 gap-4 mx-auto aspect-[1.375]">
      {activeTopImages.map((image) => (
        <GalleryImage key={image.title} {...{ image }} />
      ))}
      {activeBottomImages.map((image) => (
        <GalleryImage key={image.title} {...{ image }} />
      ))}
      <button
        className="mx-auto p-4 border-solid border-2 border-sky-500 rounded-xl"
        onClick={onShuffleImages}
      >
        Shuffle
      </button>
    </div>
  );
};
