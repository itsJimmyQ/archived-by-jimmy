'use client';

import * as React from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from 'common/interactions';
import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

const CLASSNAME_GRID = [
  'grid',
  'grid-rows-1',
  'grid-cols-1',
  'md:grid-cols-3',
  '2xl:grid-cols-5',
  'gap-10',
];

const CLASSNAME_PADDING = ['py-6', 'md:py-10'];

export const GalleryView = () => {
  const { activeImages, isReady, onShuffleImages } = useGallery();

  return (
    <>
      <div
        className={clsx(
          'w-full h-full overflow-hidden place-items-top',
          CLASSNAME_GRID,
          CLASSNAME_PADDING,
        )}
      >
        <AnimatePresence mode="wait">
          {isReady &&
            activeImages.map((image, index) => (
              <GalleryImage key={image.src} {...{ image, index }} />
            ))}
        </AnimatePresence>
      </div>
      <Button className="fixed top-[80%] left-[50%] translate-x-[-50%]" onClick={onShuffleImages}>
        Shuffle
      </Button>
    </>
  );
};
