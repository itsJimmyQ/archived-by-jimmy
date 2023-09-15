'use client';

import * as React from 'react';

import clsx from 'clsx';

const CLASSNAME_LINE = 'w-8 h-[1px] absolute bg-ivory-300 origin-center transition-transform';

export const MenuButton = () => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <button
      className="w-10 h-10 flex flex-col justify-center items-center relative"
      onClick={() => setIsActive(!isActive)}
    >
      <span className={clsx(CLASSNAME_LINE, isActive ? 'rotate-45' : '-translate-y-1  rotate-0')} />
      <span className={clsx(CLASSNAME_LINE, isActive ? '-rotate-45' : 'translate-y-1 rotate-0')} />
    </button>
  );
};
