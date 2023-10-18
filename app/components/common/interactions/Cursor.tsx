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

export const Cursor = ({ children, pos, onClick }: CursorProps) => {
  if (!pos) return null;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className={clsx(
        'group absolute z-50 p-8 rounded-full bg-grass-100 active:bg-grass-200 transition-all ease-out select-none cursor-none',
      )}
      style={{
        transform: `translateX(calc(${pos.x}px - 50%)) translateY(calc(${pos.y}px - 50%))`,
      }}
      {...(onClick && { onClick })}
    >
      {children}
    </motion.div>
  );
};

type CursorProps = {
  children?: React.ReactNode;
  pos: CursorPosition | null;
  onClick: (() => void) | null;
};

export type CursorPosition = {
  x: number;
  y: number;
};
