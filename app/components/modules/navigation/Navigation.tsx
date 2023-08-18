'use client';

import * as React from 'react';

import { Button } from 'common/interactions';

export const Navigation = () => {
  const [activeItem, setActiveItem] = React.useState<NavigationItem>('WORK');

  return (
    <nav className="w-full flex px-32 py-10">
      <ul className="w-full flex justify-between">
        <div className="flex">
          <li>
            <Button onClick={() => setActiveItem('WORK')}>Work</Button>
          </li>
        </div>
        <div className="flex gap-6">
          <li>
            <Button onClick={() => setActiveItem('ABOUT')}>About</Button>
          </li>
          <li>
            <Button onClick={() => setActiveItem('CONTACT')}>Contact</Button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

type NavigationItem = 'WORK' | 'ABOUT' | 'CONTACT';
