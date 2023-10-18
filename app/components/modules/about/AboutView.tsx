'use client';

import * as React from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

const VARIANTS = {
  initial: {
    y: '-100%',
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
  animate: {
    y: '0%',
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.8 },
  },
};

export const AboutView = ({ isOpened }: AboutViewProps) => {
  return (
    <motion.div
      variants={VARIANTS}
      initial="initial"
      animate={isOpened ? 'animate' : 'initial'}
      className={clsx(
        'w-full min-h-screen max-h-screen flex flex-col items-center pt-20 absolute top-0 left-0 bg-ivory-200',
      )}
    ></motion.div>
  );
};

type AboutViewProps = {
  isOpened: boolean;
};
