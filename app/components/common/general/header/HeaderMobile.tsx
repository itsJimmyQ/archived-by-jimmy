'use client';

import * as React from 'react';

import clsx from 'clsx';

import { useGallery } from 'hooks';
import { useModal } from 'hooks/useModal';
import { AboutViewMobile } from 'modules/about';
import { MODAL_IDS } from 'services/constants';

import { Logo } from '..';

export const HeaderMobile = () => {
  const { onOpenModal } = useModal();
  const { lastUpdatedAt, isReady } = useGallery();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full py-1 bg-ivory-200">
        <p className={clsx('w-full text-center text-sm text-ivory-300')}>
          {isReady ? `Last updated ${lastUpdatedAt}` : 'loading...'}
        </p>
      </div>
      <header
        className={clsx(
          'flex justify-between items-center z-10 px-6 tablet:px-6 desktop:px-12 large:px-32 py-4 desktop:py-6',
        )}
      >
        <Logo />
        <button
          className={clsx('font-medium text-sm text-ivory-300')}
          type="button"
          onClick={() => onOpenModal(MODAL_IDS.ABOUT)}
        >
          about & contact
        </button>
      </header>

      <AboutViewMobile />
    </div>
  );
};
