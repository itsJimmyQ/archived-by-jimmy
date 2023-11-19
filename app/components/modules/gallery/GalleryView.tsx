'use client';

import * as React from 'react';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

export const GalleryView = () => {
  const { activeImages, isReady } = useGallery();

  return (
    <div
      className={clsx(
        'w-full h-full',
        'grid grid-rows-1 grid-cols-1 desktop:grid-cols-6 large:grid-cols-6 place-items-center desktop:gap-10',
      )}
    >
      <AnimatePresence mode="wait">
        <>
          {isReady &&
            activeImages.map((image, index) => (
              <GalleryImage key={image.src} {...{ image, index }} />
            ))}
        </>
      </AnimatePresence>
    </div>
  );
};
