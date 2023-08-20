import { GalleryView } from 'modules/gallery';
import { Navigation } from 'modules/navigation';

const HomePage = () => {
  return (
    <main className="flex flex-col h-screen min-h-screen max-h-screen overflow-hidden pt-10 px-32">
      <GalleryView />
      <Navigation />
    </main>
  );
};

export default HomePage;
