'use client';

import * as React from 'react';

import { Cursor, CursorPosition } from 'common/interactions';

export const CursorContext = React.createContext<CursorContext | null>(null);

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [pos, setPos] = React.useState<CursorPosition | null>(null);

  React.useEffect(() => {
    const updatePos = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updatePos);

    return () => window.removeEventListener('mousemove', updatePos);
  }, []);

  return (
    <CursorContext.Provider value={{ setCursorMode: () => null }}>
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
