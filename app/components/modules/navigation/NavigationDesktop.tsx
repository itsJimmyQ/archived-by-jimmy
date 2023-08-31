'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from 'common/interactions';

export const NavigationDesktop = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full flex px-32 py-10 bg-ivory-100">
      <ul className="w-full flex justify-between">
        <div className="flex">
          <li>
            <Button onClick={() => router.push('/')} isActive={pathname === '/'}>
              Work
            </Button>
          </li>
        </div>
        <div className="flex gap-10">
          <li>
            <Button onClick={() => router.push('/about')} isActive={pathname === '/about'}>
              About
            </Button>
          </li>
          <li>
            <Button onClick={() => router.push('/contact')} isActive={pathname === '/contact'}>
              Contact
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

type NavigationItem = 'WORK' | 'ABOUT' | 'CONTACT';
