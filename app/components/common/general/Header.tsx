'use client';

import { Logo } from './Logo';
import { MenuButton } from './MenuButton';

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 lg:py-6">
      <Logo />
      <MenuButton />
    </header>
  );
};
