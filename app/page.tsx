'use client';

import * as React from 'react';

import clsx from 'clsx';

import { AboutModal } from 'modules/about';
import { GalleryFooter, GalleryView } from 'modules/gallery';

const HomePage = () => {
  React.useEffect(() => {
    console.info(
      'Designed and built by Jimmy ✨ \n https://www.linkedin.com/in/jimmy-qian-38b381188/ \n ',
    );
  }, []);

  return (
    <div
      className={clsx(
        'w-full h-full max-h-full grid grid-cols-1 grid-rows-[0.8fr_0.2fr] desktop:flex desktop:flex-col',
        'px-4 tablet:px-20 desktop:px-12 large:px-32',
      )}
    >
      <GalleryView />
      <GalleryFooter />
      <AboutModal />
    </div>
  );
};

export default HomePage;
