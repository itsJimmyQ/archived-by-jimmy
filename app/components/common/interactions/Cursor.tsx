'use client';

import * as React from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useGallery } from 'hooks';
import IconShuffle from 'vectors/shuffle.svg';

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

export const Cursor = ({ mode }: CursorProps) => {
  const refCursor = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState<Pos | null>(null);
  const { onShuffleImages } = useGallery();

  React.useEffect(() => {
    const updatePos = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updatePos);

    return () => window.removeEventListener('mousemove', updatePos);
  }, []);

  if (!pos) return null;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className={clsx(
        'group absolute z-10 rounded-full transition-transform ease-out pointer-events-none',
      )}
      style={{
        transform: `translateX(calc(${pos.x}px - 50%)) translateY(calc(${pos.y}px - 50%))`,
      }}
      onClick={mode === 'SHUFFLE' ? onShuffleImages : undefined}
    >
      <div className="p-10 rounded-full  border-[1px] border-solid border-grass-300 group-active:bg-grass-300 group-active:scale-90 transition-transform">
        <IconShuffle className="w-[1.5rem] h-[1.5rem] fill-grass-300 group-active:fill-ivory-100" />
      </div>
    </motion.div>
  );
};

type CursorProps = {
  mode?: 'SHUFFLE';
};

type Pos = {
  x: number;
  y: number;
};
