'use client';

import * as React from 'react';
import * as i from 'types';

import clsx from 'clsx';
import { motion } from 'framer-motion';

export const GalleryImage = ({ image, index }: GalleryImageProps) => {
  const [isPainted, setIsPainted] = React.useState(false);

  const amountColumns = 'col-span-2';
  let aspectRatio: string | undefined;
  switch (image.orientation) {
    case 'portrait':
      aspectRatio = 'aspect-[12/16]';
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
  const VARIANTS_IMAGE = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: index * 0.1,
        ease: 'linear',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'linear',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isPainted ? 'visible' : 'hidden'}
      exit="exit"
      variants={VARIANTS_IMAGE}
      className={clsx('w-full relative rounded-sm', amountColumns, aspectRatio)}
    >
      <img
        className="w-full h-full object-cover object-center rounded-sm"
        src={image.src}
        alt={image.title}
        // Detect when the image is painted instead of loaded to DOM
        onLoad={() => setIsPainted(true)}
      />
    </motion.div>
  );
};

type GalleryImageProps = {
  image: i.FormattedImage;
  index: number;
};
