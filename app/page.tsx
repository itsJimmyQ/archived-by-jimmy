'use client';

import { ViewportContainer } from 'common/general';
import { useDevice } from 'hooks';
import { GalleryFooter, GalleryView } from 'modules/gallery';

const HomePage = () => {
  const { device, isDeviceDetermined } = useDevice();

  if (!isDeviceDetermined) return;

  return (
    <>
      <GalleryView />
      {device !== 'mobile' && device !== 'tablet' && <GalleryFooter />}
    </>
  );
};

export default HomePage;
