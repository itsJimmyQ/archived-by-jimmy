'use client';

import clsx from 'clsx';

import { Icon, ViewportContainer } from 'common/general';
import { KbdShortcut } from 'common/interactions';
import { useGallery } from 'hooks';
import { useModal } from 'hooks/useModal';
import { MODAL_IDS } from 'services/constants';
import IconShuffle from 'vectors/shuffle.svg';

export const GalleryFooter = () => {
  const { onShuffleImages } = useGallery();
  const { onOpenModal } = useModal();

  return (
    <>
      <ViewportContainer.Mobile>
        <button
          className={clsx(
            'w-full flex justify-center items-center my-4 p-6 rounded-[4px] border border-ivory-300',
            'group-hover:bg-ivory-200 transition-all ease-linear duration-200',
          )}
          onClick={onShuffleImages}
        >
          <Icon icon={IconShuffle} color="ivory" />
        </button>
      </ViewportContainer.Mobile>

      <ViewportContainer.Desktop>
        <div className="w-full flex justify-center items-center gap-20 py-10">
          <KbdShortcut label="shuffle" shortcutKey="Space" onUse={onShuffleImages} />
          <KbdShortcut
            label="about & contact"
            shortcutKey="KeyA"
            onUse={() => onOpenModal(MODAL_IDS.ABOUT)}
          />
        </div>
      </ViewportContainer.Desktop>
    </>
  );
};