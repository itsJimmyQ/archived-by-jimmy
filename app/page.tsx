'use client';

import { Cursor } from 'common/interactions';
import { GalleryView } from 'modules/gallery';
import { Navigation } from 'modules/navigation';

const HomePage = () => {
  return (
    <main className="w-full h-full relative overflow-hidden bg-ivory-100">
      <Cursor mode="SHUFFLE" />
      <div className="flex flex-col h-screen min-h-screen max-h-screen overflow-hidden">
        <GalleryView />
        <Navigation />
      </div>
    </main>
  );
};

export default HomePage;
