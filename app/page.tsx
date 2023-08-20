'use client';

import { Cursor } from 'common/interactions';
import { GalleryView } from 'modules/gallery';
import { Navigation } from 'modules/navigation';

const HomePage = () => {
  return (
    <main className="overflow-hidden relative bg-ivory">
      <Cursor mode="SHUFFLE" />
      <div className="flex flex-col h-screen min-h-screen max-h-screen overflow-hidden pt-10 px-32">
        <GalleryView />
        <Navigation />
      </div>
    </main>
  );
};

export default HomePage;
