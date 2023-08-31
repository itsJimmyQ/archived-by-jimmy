'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { IconButton } from 'common/interactions';
import IconMenu from 'vectors/menu.svg';
import IconShuffle from 'vectors/shuffle.svg';

export const NavigationMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full flex gap-2 p-6">
      <IconButton
        icon={IconShuffle}
        onClick={() => router.push('/')}
        isActive={pathname === '/'}
        isFullWidth
      />
      <IconButton
        icon={IconMenu}
        onClick={() => router.push('/about')}
        isActive={pathname === '/about'}
      />
    </nav>
  );
};
