'use client';

import * as React from 'react';

import { AboutView } from 'modules/about';
import { AboutButton } from 'modules/about';

import { Logo } from './Logo';

export const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  return (
    <>
      <header className="flex justify-between items-center z-10 py-4 lg:py-6 px-6 lg:px-20 xl:px-32">
        <Logo />
        <AboutButton
          isActive={isMenuOpened}
          onClick={() => setIsMenuOpened((isMenuOpened) => !isMenuOpened)}
        />
      </header>

      <AboutView isOpened={isMenuOpened} />
    </>
  );
};
