'use client';

import * as React from 'react';

import { Cursor, CursorPosition } from 'common/interactions';
import { useGallery } from 'hooks';

export const CursorContext = React.createContext<CursorContext | null>(null);

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [pos, setPos] = React.useState<CursorPosition | null>(null);
  const [mode, setMode] = React.useState<CursorMode>('DEFAULT');
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

  const cursorModeConfigs = {
    DEFAULT: {
      children: null,
      onClick: () => null,
    },
    SHUFFLE: {
      children: 'Shuffle',
      onClick: onShuffleImages,
    },
  };
  const currCursorConfig = cursorModeConfigs[mode];

  return (
    <CursorContext.Provider value={{ setCursorMode: setMode }}>
      <Cursor onClick={currCursorConfig.onClick} {...{ pos }}>
        {currCursorConfig.children}
      </Cursor>
      {children}
    </CursorContext.Provider>
  );
};

type CursorProviderProps = {
  children: React.ReactNode;
};

type CursorContext = {
  setCursorMode: (mode: CursorMode) => void;
};

type CursorMode = 'DEFAULT' | 'SHUFFLE';
