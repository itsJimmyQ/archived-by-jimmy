'use client';

import * as i from 'types';
import * as React from 'react';
import clsx from 'clsx';

const galleryImageStyle: Record<string, string> = {
  portrait: 'w-full',
  landscape: 'w-auto',
  square: 'w-auto',
};

export const GalleryImage = ({ image }: GalleryImageProps) => {
  let amountColumns;
  if (image.orientation === 'portrait') amountColumns = 1;
  else amountColumns = 2;

  return (
    <div className={`w-full h-full col-span-${amountColumns}`}>
      <img
        className={clsx('h-full mx-auto object-cover', galleryImageStyle[image.orientation])}
        src={image.src}
        alt={image.title}
      />
    </div>
  );
};

type GalleryImageProps = {
  image: i.FormattedImage;
};
