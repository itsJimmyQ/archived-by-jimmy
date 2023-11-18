'use client';

import * as React from 'react';

import clsx from 'clsx';

import { AboutModal } from 'modules/about';
import { GalleryFooter, GalleryView } from 'modules/gallery';

const HomePage = () => {
  React.useEffect(() => {
    console.info(
      'Designed and built by Jimmy ✨ \n https://www.linkedin.com/in/jimmy-qian-38b381188/',
    );
  }, []);

  return (
    <div
      className={clsx(
        'w-full h-full flex flex-col items-between',
        'px-6 tablet:px-20 desktop:px-12 large:px-32',
      )}
    >
      <GalleryView />
      <GalleryFooter />
      <AboutModal />
    </div>
  );
};

export default HomePage;
