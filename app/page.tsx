'use client';

import { ViewportContainer } from 'common/general';
import { GalleryView } from 'modules/gallery';
import { NavigationDesktop, NavigationMobile } from 'modules/navigation';

const HomePage = () => {
  return (
    <main className="w-full h-full relative overflow-hidden bg-ivory-100">
      <div className="flex flex-col h-screen min-h-screen max-h-screen overflow-hidden">
        <GalleryView />

        <ViewportContainer.Desktop>
          <NavigationDesktop />
        </ViewportContainer.Desktop>
        <ViewportContainer.Mobile>
          <NavigationMobile />
        </ViewportContainer.Mobile>
      </div>
    </main>
  );
};

export default HomePage;
