'use client';

import * as React from 'react';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { Button } from 'common/interactions';
import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

const CLASSNAME_GRID = [
  'grid',
  'grid-rows-1',
  'grid-cols-1',
  'md:grid-cols-3',
  'xl:grid-cols-5',
  'gap-10',
];

export const GalleryView = () => {
  const { activeImages, isReady, onShuffleImages } = useGallery();

  return (
    <>
      <div className={clsx('w-full h-full overflow-hidden place-items-start', CLASSNAME_GRID)}>
        {isReady && activeImages.map((image) => <GalleryImage key={image.src} {...{ image }} />)}
      </div>
      <Button className="fixed top-[80%] left-[50%]" onClick={onShuffleImages}>
        Shuffle
      </Button>
    </>
  );
};
