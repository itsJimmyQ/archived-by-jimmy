'use client';

import * as React from 'react';

import { GalleryImage } from './GalleryImage';
import { useGallery } from 'hooks';

export const GalleryView = () => {
  const { activeImages, onShuffleImages, progress } = useGallery();

  const isLoading = progress < 100;

  return (
    <>
      <div className="w-auto max-w-full h-full grid grid-cols-4 grid-rows-2 gap-4 mx-auto aspect-[1.33]">
        {isLoading && <h1>{progress}</h1>}
        {!isLoading &&
          activeImages.map((image) => <GalleryImage key={image.title} {...{ image }} />)}
      </div>
      <button
        className="absolute bottom-4 left-[50%] -translate-x-[50%] mx-auto p-4 border-solid border-2 border-sky-500 rounded-xl"
        onClick={onShuffleImages}
      >
        Refresh
      </button>
    </>
  );
};
