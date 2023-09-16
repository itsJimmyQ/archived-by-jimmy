'use client';

import { Logo } from './Logo';

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 lg:py-6 px-6 lg:px-20 xl:px-32">
      <Logo />
    </header>
  );
};
