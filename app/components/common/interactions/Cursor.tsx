'use client';

import * as React from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'ease',
      duration: 0.2,
      delay: 0.4,
    },
  },
};

export const Cursor = ({ children, pos }: CursorProps) => {
  if (!pos) return null;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className={clsx(
        'group absolute z-10 p-4 rounded-full bg-grass-100 transition-transform ease-out select-none pointer-events-none',
      )}
      style={{
        transform: `translateX(calc(${pos.x}px - 50%)) translateY(calc(${pos.y}px - 50%))`,
      }}
    >
      {children}
    </motion.div>
  );
};

type CursorProps = {
  children?: React.ReactNode;
  pos: CursorPosition | null;
};

export type CursorPosition = {
  x: number;
  y: number;
};
