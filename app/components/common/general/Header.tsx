'use client';

import * as React from 'react';

import { Logo } from './Logo';

export const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center z-10 py-4 lg:py-6 px-6 lg:px-20 xl:px-32 pointer-events-none">
        <Logo />
      </header>
    </>
  );
};
