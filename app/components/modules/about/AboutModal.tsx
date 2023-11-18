'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import clsx from 'clsx';

import { Modal, ViewportContainer } from 'common/general';
import { KbdShortcut } from 'common/interactions';
import { useModal } from 'hooks/useModal';
import ImageBio from 'images/bio.jpg';
import { MODAL_IDS } from 'services/constants';

export const AboutModal = () => {
  const { openedModalId, onCloseModal } = useModal();

  React.useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== 'Escape') return;

    onCloseModal();
  };

  return (
    <Modal.Root isOpened={openedModalId === MODAL_IDS.ABOUT} {...{ onCloseModal }}>
      <Modal.Body>
        <Modal.Header title="About & Contact" {...{ onCloseModal }} />
        <Modal.Content>
          <div className="w-full flex flex-col content-start items-center desktop:gap-16">
            <div
              className={clsx(
                'w-full h-full',
                'flex flex-col gap-12',
                'desktop:grid desktop:grid-cols-[0.4fr_0.6fr] desktop:items-center desktop:gap-16',
              )}
            >
              <div
                className={clsx(
                  'w-[calc(100%-48px)] max-w-[480px] mx-auto desktop:w-full aspect-square relative',
                )}
              >
                <Image
                  src={ImageBio}
                  alt="Self-portrait of Jimmy"
                  objectFit="cover"
                  className="rounded-lg"
                  priority={true}
                  fill
                />
                <Link
                  title="Send me an email"
                  href="mailto:jimmyqian717@gmail.com"
                  className={clsx(
                    'btn-contact text-3xl border-grass-300 bg-grass-100 text-grass-300 rotate-[-11deg] top-[-5%] left-[-8%]',
                    'hover:rotate-[-14deg]',
                  )}
                >
                  Email me
                </Link>
                <Link
                  title="Navigate to Jimmy' Instagram"
                  href="https://www.instagram.com/iamjimmyqian/"
                  target="_blank"
                  className={clsx(
                    'btn-contact text-lg border border-purple-300 bg-purple-100 text-purple-300 rotate-[6deg] top-[50%] right-[-12%]',
                    'hover:rotate-[8deg]',
                  )}
                >
                  DM me
                </Link>
                <Link
                  title="Navigate to Jimmy' Linkedin"
                  href="https://www.linkedin.com/in/jimmy-qian-38b381188/"
                  target="_blank"
                  className={clsx(
                    'btn-contact border-blue-300 bg-blue-100 text-blue-300 rotate-[-5deg] bottom-[-5%] left-[-12%]',
                    'hover:rotate-[-6deg]',
                  )}
                >
                  Or Linkedin
                </Link>
              </div>

              <div className="w-full">
                <p className="font-sans text-lg leading-[160%]">
                  My name is Jimmy, currently based in The Hague, Netherlands. Welcome to the space
                  where I archive a selection of my favourite shots.
                  <br />
                  <br />
                  After a good couple years of photographing, I've come to the realization that what
                  I desire, is to take photos that are timeless, that viewers would come back over
                  and over to look at. Photographs that make people feel the emotions within the
                  frames and really having to think about them. <br />
                  <br />
                  While I embark on the journey towards that goal, I chose to use a digital archive
                  as an intuitive way of recording how I am evolving as a creative. If you enjoy
                  what you see, feel free to reach out! I am open to any inquiries, requests or just
                  a chat :D
                </p>
              </div>
            </div>

            <ViewportContainer.Desktop>
              <KbdShortcut label="Close" shortcutKey="ESC" onUse={onCloseModal} />
            </ViewportContainer.Desktop>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};
