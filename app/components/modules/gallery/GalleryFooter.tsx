'use client';

import { KbdShortcut } from 'common/interactions';
import { useGallery } from 'hooks';

export const GalleryFooter = () => {
  const { onShuffleImages } = useGallery();

  return (
    <div className="w-full flex justify-center items-center gap-20 py-10">
      <KbdShortcut label="shuffle" shortcutKey="Space" key="Space" onUse={onShuffleImages} />
    </div>
  );
};
