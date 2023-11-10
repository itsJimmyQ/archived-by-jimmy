'use client';

import * as React from 'react';

import { GalleryFooter, GalleryView } from 'modules/gallery';

const HomePage = () => {
  React.useEffect(() => {
    console.info(
      'Designed and built by Jimmy ✨ \n https://www.linkedin.com/in/jimmy-qian-38b381188/',
    );
  }, []);

  return (
    <>
      <GalleryView />
      <GalleryFooter />
    </>
  );
};

export default HomePage;
