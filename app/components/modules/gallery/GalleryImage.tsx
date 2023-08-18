'use client';

import * as i from 'types';
import * as React from 'react';
import clsx from 'clsx';

const positions = [
  ['top-[0%]', '-translate-y-[0%]'],
  ['top-[10%]', '-translate-y-[10%]'],
  ['top-[20%]', '-translate-y-[20%]'],
  ['top-[30%]', '-translate-y-[30%]'],
  ['top-[40%]', '-translate-y-[40%]'],
  ['top-[50%]', '-translate-y-[50%]'],
  ['top-[60%]', '-translate-y-[60%]'],
  ['top-[70%]', '-translate-y-[70%]'],
  ['top-[80%]', '-translate-y-[80%]'],
  ['top-[90%]', '-translate-y-[90%]'],
  ['top-[100%]', '-translate-y-[100%]'],
];

export const GalleryImage = ({ image, isActive }: GalleryImageProps) => {
  let amountColumns;
  let padding;
  let opacity = isActive ? 'opacity-1' : 'opacity-0';
  let visibility = isActive ? 'visible' : 'hidden';
  if (image.orientation === 'portrait') amountColumns = `col-span-1`;
  else {
    if (image.orientation === 'square') padding = `px-12`;

    amountColumns = `col-span-2`;
  }
  const position = positions[Math.floor(Math.random() * (positions.length - 1))];

  return (
    <div
      className={clsx(
        'w-full h-full relative transition-all',
        amountColumns,
        padding,
        opacity,
        visibility,
      )}
    >
      <img
        className={clsx('absolute object rounded-md left-0 right-0', position)}
        src={image.src}
        alt={image.title}
      />
    </div>
  );
};

type GalleryImageProps = {
  image: i.FormattedImage;
  isActive?: boolean;
};
