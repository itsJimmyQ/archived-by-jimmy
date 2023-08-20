'use client';

import * as React from 'react';
import clsx from 'clsx';

import { useGallery } from 'hooks';
import IconShuffle from 'vectors/shuffle.svg';

export const Cursor = ({ mode }: CursorProps) => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const { onShuffleImages } = useGallery();

  React.useEffect(() => {
    const updatePos = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePos);

    return () => window.removeEventListener('mousemove', updatePos);
  }, []);

  return (
    <div
      className={clsx('group absolute z-10 rounded-full transition-transform ease-out')}
      style={{
        transform: `translateX(calc(${pos.x}px - 50%)) translateY(calc(${pos.y}px - 50%))`,
      }}
      onClick={mode === 'SHUFFLE' ? onShuffleImages : undefined}
    >
      <div className="p-10 rounded-full  border-[1px] border-solid border-grass-300 group-active:bg-grass-300 group-active:scale-90 transition-transform">
        <IconShuffle className="w-[1.5rem] h-[1.5rem] fill-grass-300 group-active:fill-ivory" />
      </div>
    </div>
  );
};

type CursorProps = {
  mode?: 'SHUFFLE';
};
