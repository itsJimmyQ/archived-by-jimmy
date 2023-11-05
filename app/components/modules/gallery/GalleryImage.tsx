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
      className={clsx('w-full relative rounded-lg col-span-2 group cursor-zoom-in', {
        'aspect-[12/16]': image.orientation === 'portrait',
        'aspect-[16/10]': image.orientation === 'landscape',
        'aspect-square': image.orientation === 'square',
      })}
    >
      <img
        className="w-full h-full object-cover object-center rounded-sm "
        src={image.src}
        alt={image.title}
        // Detect when the image is painted instead of loaded to DOM
        onLoad={() => setIsPainted(true)}
      />
      <span
        className={clsx(
          'desktop:w-[calc(100%+24px)] desktop:h-[calc(100%+24px)] large:w-[calc(100%+32px)] large:h-[calc(100%+32px)] absolute -z-10 border border-ivory-300 rounded-[4px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0',
          'group group-hover:opacity-100 transition-all ease-linear duration-100',
        )}
      />
    </motion.div>
  );
};

type GalleryImageProps = {
  image: i.FormattedImage;
  index: number;
};
