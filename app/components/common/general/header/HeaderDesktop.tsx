'use client';

import * as React from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { useGallery } from 'hooks';

import { Logo } from '..';

export const HeaderDesktop = () => {
  const { lastUpdatedAt, isReady } = useGallery();

  return (
    <header
      className={clsx(
        'flex justify-between items-center z-10',
        'desktop:px-12 large:px-32 desktop:py-6',
      )}
    >
      <Logo />
      <AnimatePresence>
        {isReady && (
          <motion.p
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.2,
                  ease: 'linear',
                },
              },
            }}
            className={clsx('py-1 px-4 rounded-[99px] text-sm bg-ivory-200 text-ivory-300')}
          >
            Last updated {lastUpdatedAt}
          </motion.p>
        )}
      </AnimatePresence>
    </header>
  );
};
