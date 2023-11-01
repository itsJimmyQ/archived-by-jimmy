'use client';

import { ViewportContainer } from 'common/general';
import { useDevice } from 'hooks';
import { GalleryFooter, GalleryView } from 'modules/gallery';

const HomePage = () => {
  return (
    <>
      <GalleryView />
      <GalleryFooter />
    </>
  );
};

export default HomePage;
