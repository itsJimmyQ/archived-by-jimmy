'use client';

import * as React from 'react';

import clsx from 'clsx';

import { Logo } from './Logo';

export const Header = () => {
  return (
    <>
      <header className={clsx('flex justify-between items-center z-10', 'py-4 tablet:py-6')}>
        <Logo />
      </header>
    </>
  );
};
