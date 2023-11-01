'use client';

import clsx from 'clsx';

import { Icon } from 'common/general';
import { KbdShortcut } from 'common/interactions';
import { useDevice, useGallery } from 'hooks';
import IconShuffle from 'vectors/shuffle.svg';

export const GalleryFooter = () => {
  const { onShuffleImages } = useGallery();
  const { device, isDeviceDetermined } = useDevice();

  if (!isDeviceDetermined) return;

  if (device === 'mobile' || device === 'tablet')
    return (
      <button
        className={clsx(
          'flex justify-center items-center my-4 p-6 rounded-[4px] border border-ivory-300',
          'group-hover:bg-ivory-200 transition-all ease-linear duration-200',
        )}
        onClick={onShuffleImages}
      >
        <Icon icon={IconShuffle} color="ivory" />
      </button>
    );

  return (
    <div className="w-full flex justify-center items-center gap-20 py-10">
      <KbdShortcut label="shuffle" shortcutKey="Space" key="Space" onUse={onShuffleImages} />
    </div>
  );
};
