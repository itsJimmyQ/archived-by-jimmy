'use client';

import * as React from 'react';

import clsx from 'clsx';

import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

const STYLES_GRID = [
  'grid',
  'grid-rows-1',
  'grid-cols-1',
  'lg:grid-cols-3',
  'xl:grid-cols-5',
  'gap-10',
];

const STYLES_PADDING = ['px-6', 'lg:px-20', 'xl:px-32', 'py-0', 'lg:py-4', 'xl:py-6'];

export const GalleryView = () => {
  const { activeImages, nextImages, isReady } = useGallery();

  return (
    <div className={clsx('w-full h-full overflow-hidden', STYLES_GRID, STYLES_PADDING)}>
      {isReady &&
        activeImages.map((image) => <GalleryImage key={image.src} isActive {...{ image }} />)}
      {isReady && nextImages.map((image) => <GalleryImage key={image.src} {...{ image }} />)}
    </div>
  );
};
