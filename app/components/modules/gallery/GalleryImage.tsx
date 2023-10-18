'use client';

import * as React from 'react';
import * as i from 'types';

import clsx from 'clsx';
import { motion } from 'framer-motion';

export const GalleryImage = ({ image, index }: GalleryImageProps) => {
  const [isPainted, setIsPainted] = React.useState(false);

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
      className={clsx('w-full relative rounded-sm col-span-2', {
        'aspect-[12/16]': image.orientation === 'portrait',
        'aspect-[16/12]': image.orientation === 'landscape',
        'aspect-square': image.orientation === 'square',
      })}
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
