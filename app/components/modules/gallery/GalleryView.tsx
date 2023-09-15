'use client';

import * as React from 'react';

import clsx from 'clsx';

import { useGallery } from 'hooks';

import { GalleryImage } from './GalleryImage';

const CLASSNAME_GRID = ['grid', 'grid-rows-1', 'grid-cols-1', 'lg:grid-cols-4', 'gap-10'];
const CLASSNAME_PADDING = ['py-0', 'lg:py-4', 'xl:py-6'];

export const GalleryView = () => {
  const { activeImages, nextImages, isReady } = useGallery();

  return (
    <div className={clsx('w-full h-full overflow-hidden', CLASSNAME_GRID, CLASSNAME_PADDING)}>
      {isReady &&
        activeImages.map((image) => <GalleryImage key={image.src} isActive {...{ image }} />)}
      {isReady && nextImages.map((image) => <GalleryImage key={image.src} {...{ image }} />)}
    </div>
  );
};
