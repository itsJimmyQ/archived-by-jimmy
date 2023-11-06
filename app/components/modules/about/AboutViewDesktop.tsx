'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

import { Icon } from 'common/general';
import { useModal } from 'hooks/useModal';
import ImageBio from 'images/bio.jpg';
import { MODAL_IDS } from 'services/constants';
import IconClose from 'vectors/close.svg';

const variantsBody = {
  initial: {
    opacity: 0,
    scale: 1.05,
    x: '-50%',
    y: '-50%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    x: '-50%',
    y: '-50%',
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const variantsOverlay = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
    transition: {
      duration: 0.2,
      ease: 'ease',
    },
  },
};

export const AboutViewDesktop = () => {
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
    <AnimatePresence>
      {openedModalId === MODAL_IDS.ABOUT && (
        <>
          <motion.div
            className={clsx(
              'w-10/12 large:w-8/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20',
              'rounded-3xl overflow-hidden bg-ivory-100 flex flex-col',
            )}
            variants={variantsBody}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="w-full py-2 bg-ivory-200 relative">
              <h6 className="font-medium text-center">about & contact</h6>
              <Icon
                icon={IconClose}
                color="ivory"
                className="absolute top-[50%] right-6 translate-y-[-50%]"
                title="Close 'about & contact'"
                onClick={onCloseModal}
              />
            </div>
            <div className="w-full px-16 large:px-20 py-10 large:py-16 flex flex-col items-center gap-20">
              <div className="w-full h-full grid grid-cols-[0.4fr_0.6fr] items-center gap-16">
                <div className="w-full aspect-square relative">
                  <Image
                    src={ImageBio}
                    alt="Self-portrait of Jimmy"
                    objectFit="cover"
                    className="rounded-lg"
                    fill
                  />
                  <Link
                    href="mailto:jimmyqian717@gmail.com"
                    className={clsx(
                      'absolute font-medium text-3xl border border-grass-300 bg-grass-100 px-6 py-2 rounded-full text-grass-300 rotate-[-11deg] top-[-5%] left-[-8%]',
                    )}
                  >
                    Email me
                  </Link>
                  <Link
                    href="https://www.instagram.com/iamjimmyqian/"
                    target="_blank"
                    className={clsx(
                      'absolute font-medium text-lg border border-purple-300 bg-purple-100 px-6 py-2 rounded-full text-purple-300 rotate-[6deg] top-[50%] right-[-12%]',
                    )}
                  >
                    DM me
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/jimmy-qian-38b381188/"
                    target="_blank"
                    className={clsx(
                      'absolute font-medium border border-blue-300 bg-blue-100 px-6 py-2 rounded-full text-blue-300 rotate-[-5deg] bottom-[-5%] left-[-12%]',
                    )}
                  >
                    Or Linkedin
                  </Link>
                </div>
                <div className="w-full">
                  <p className="font-serif text-xl leading-[160%]">
                    My name is Jimmy, currently based in The Hague, Netherlands. Welcome to the
                    space where I archive a selection of my favourite shots.
                    <br />
                    <br />
                    After a good couple years of photographing, I've come to the realization that
                    what I desire, is to take photos that are timeless, that viewers would come back
                    over and over to look at. Photographs that make people feel the emotions within
                    the frames and really having to think about them.
                    <br />
                    <br />
                    While I embark on the journey towards that goal, I chose to use a digital
                    archive as an intuitive way of recording how I am evolving as a creative. If you
                    enjoy what you see, feel free to reach out! I am open to any inquiries, or just
                    a message to meet up ;D
                  </p>
                </div>
              </div>
              <p className="w-10/12 large:text-center font-sans opacity-60 italic font-normal">
                The photos you see were shot using a variety of cameras: Sony A7 Riii, Nikon D3500,
                Hasselblad 500C and Canon EOS 3. I like to switch up my toys once in a while, it's a
                nice trick for me to continuously create with joy.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="w-full h-[100dvh] bg-ivory-300 absolute z-10 top-0 left-0"
            variants={variantsOverlay}
            initial="initial"
            animate="animate"
            exit="initial"
            onClick={onCloseModal}
          />
        </>
      )}
    </AnimatePresence>
  );
};
