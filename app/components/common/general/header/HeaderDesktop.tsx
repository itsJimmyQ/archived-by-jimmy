'use client';

import * as React from 'react';

import clsx from 'clsx';

import { useGallery } from 'hooks';
import { AboutViewDesktop } from 'modules/about';

import { Logo } from '..';

export const HeaderDesktop = () => {
  const { lastUpdatedAt, isReady } = useGallery();

  return (
    <div className="w-full">
      <header
        className={clsx(
          'flex justify-between items-center z-10 px-6 tablet:px-6 desktop:px-12 large:px-32 py-4 desktop:py-6',
        )}
      >
        <Logo />
        {isReady && (
          <p className={clsx('py-1 px-4 rounded-[99px] text-sm bg-ivory-200 text-ivory-300')}>
            Last updated {lastUpdatedAt}
          </p>
        )}
      </header>

      <AboutViewDesktop />
    </div>
  );
};
