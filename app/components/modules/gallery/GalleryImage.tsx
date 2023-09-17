'use client';

import Image from 'next/image';
import * as React from 'react';
import * as i from 'types';

import clsx from 'clsx';
import { motion } from 'framer-motion';

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

const VARIANTS_IMAGE = {
  hidden: {
    opacity: 0,
    y: 0,
  },
  visible: {
    opacity: 1,
    transiton: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

export const GalleryImage = ({ image }: GalleryImageProps) => {
  const [isPainted, setIsPainted] = React.useState(false);

  const amountColumns = image.orientation === 'portrait' ? 'col-span-1' : 'col-span-2';
  let aspectRatio: string | undefined;
  switch (image.orientation) {
    case 'portrait':
      aspectRatio = 'aspect-[10/16]';
      break;
    case 'landscape':
      aspectRatio = 'aspect-[16/10]';
      break;
    case 'square':
      aspectRatio = 'aspect-square';
      break;
    default:
      aspectRatio = undefined;
  }

  return (
    <motion.div
      initial="hidden"
      animate={isPainted ? 'visible' : 'hidden'}
      exit="hidden"
      variants={VARIANTS_IMAGE}
      key={image.src}
      className={clsx('w-full relative', amountColumns, aspectRatio)}
    >
      <Image
        className="object-cover object-center"
        key={image.src}
        src={image.src}
        alt={image.title}
        layout="fill"
        // Detect when the image is painted instead of loaded to DOM
        onLoad={() => setIsPainted(true)}
      />
    </motion.div>
  );
};

type GalleryImageProps = {
  image: i.FormattedImage;
};
