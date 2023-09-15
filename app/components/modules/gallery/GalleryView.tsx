'use client';

import * as React from 'react';

import clsx from 'clsx';

import { useGallery } from 'hooks';
import { useCursor } from 'hooks/useCursor';

import { GalleryImage } from './GalleryImage';

const STYLES_GRID = ['grid', 'grid-rows-1', 'grid-cols-1', 'lg:grid-cols-4', 'gap-10'];

export const GalleryView = () => {
  const { activeImages, nextImages, isReady } = useGallery();
  const { setCursorMode } = useCursor();

  React.useEffect(() => {
    setCursorMode('SHUFFLE');
  }, []);

  return (
    <div className={clsx('w-full h-full overflow-hiddenpy-0 lg:py-4 xl:py-6', STYLES_GRID)}>
      {isReady &&
        activeImages.map((image) => <GalleryImage key={image.src} isActive {...{ image }} />)}
      {isReady && nextImages.map((image) => <GalleryImage key={image.src} {...{ image }} />)}
    </div>
  );
};
