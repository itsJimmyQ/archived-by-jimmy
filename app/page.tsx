'use client';

import { GalleryView } from 'modules/gallery';
import { NavigationMobile } from 'modules/navigation';

const HomePage = () => {
  return (
    <main className="w-full h-full relative overflow-hidden bg-ivory-100">
      <div className="flex flex-col h-screen min-h-screen max-h-screen overflow-hidden">
        <GalleryView />
        <NavigationMobile />
      </div>
    </main>
  );
};

export default HomePage;
