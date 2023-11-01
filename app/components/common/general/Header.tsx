'use client';

import * as React from 'react';

import clsx from 'clsx';

import { Logo } from './Logo';
import { ViewportContainer } from './ViewportContainer';

export const Header = () => {
  return (
    <div className="w-full flex flex-col">
      {/* @TODO: Add dynamic data to 'Last updated' */}
      <ViewportContainer.Mobile>
        <p className={clsx('w-full py-1 text-center text-sm bg-ivory-200 text-ivory-300')}>
          Last updated: 2 weeks ago
        </p>
      </ViewportContainer.Mobile>
      <header
        className={clsx(
          'flex justify-between items-center z-10 px-6 tablet:px-6 desktop:px-12 large:px-32 py-4 desktop:py-6',
        )}
      >
        <Logo />
        <ViewportContainer.Desktop>
          <p className={clsx('py-1 px-4 rounded-[99px] bg-ivory-200 text-ivory-300')}>
            Last updated: 2 weeks ago
          </p>
        </ViewportContainer.Desktop>
      </header>
    </div>
  );
};
