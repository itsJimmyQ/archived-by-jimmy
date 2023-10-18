'use client';

import * as React from 'react';

import clsx from 'clsx';

const CLASSNAME_LINE =
  'w-8 h-[1px] absolute bg-ivory-300 origin-center transition-transform duration-[400]';

export const AboutButton = ({ isActive, onClick }: AboutButtonProps) => {
  return (
    <button className="w-10 h-10 relative" {...{ onClick }}>
      <span
        className={clsx(CLASSNAME_LINE, {
          'rotate-45': isActive,
          '-translate-y-1 rotate-0': !isActive,
        })}
      />
      <span
        className={clsx(CLASSNAME_LINE, {
          '-rotate-45': isActive,
          'translate-y-1 rotate-0': !isActive,
        })}
      />
    </button>
  );
};

type AboutButtonProps = {
  isActive: boolean;
  onClick: () => void;
};
