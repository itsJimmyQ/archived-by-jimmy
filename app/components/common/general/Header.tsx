'use client';

import { Logo } from './Logo';
import { MenuButton } from './MenuButton';

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 lg:px-20 xl:px-32 py-0 lg:py-4 xl:py-6">
      <Logo />
      <MenuButton />
    </header>
  );
};
