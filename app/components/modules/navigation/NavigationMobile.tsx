'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import IconShuffle from 'vectors/shuffle.svg';
import IconMenu from 'vectors/menu.svg';
import { IconButton } from 'common/interactions';

export const NavigationMobile = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

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
