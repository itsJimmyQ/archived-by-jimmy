'use client';

import * as React from 'react';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { useCursor, useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

export const GalleryView = () => {
  const { activeImages, isReady } = useGallery();
  const { setCursorMode } = useCursor();

  React.useEffect(() => {
    if (!isReady) return;

    setCursorMode('SHUFFLE');
  }, [isReady]);

  return (
    <>
      <div
        className={clsx(
          'w-full h-full overflow-hidden py-6 md:py-10',
          'grid grid-rows-1 grid-cols-1 md:grid-cols-4 xl:grid-cols-6 place-items-center gap-10',
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
    </>
  );
};
