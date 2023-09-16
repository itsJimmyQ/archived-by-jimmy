'use client';

import * as React from 'react';

import clsx from 'clsx';

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
  const { activeImages, nextImages, isReady, onShuffleImages } = useGallery();

  return (
    <>
      <div className={clsx('w-full h-full overflow-hidden', CLASSNAME_GRID)}>
        {isReady &&
          activeImages.map((image) => <GalleryImage key={image.src} isActive {...{ image }} />)}
      </div>
    </>
  );
};
