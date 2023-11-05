import Image from 'next/image';
import * as React from 'react';

import ImageBio from 'public/images/bio.jpg';
import { twMerge } from 'tailwind-merge';

export const AboutView = ({}: AboutViewProps) => {
  return (
    <>
      <div
        className={twMerge(
          'w-full h-[calc(100dvh-40px)] flex flex-col absolute bottom-0 rounded-t-3xl px-4 bg-ivory-100 z-20 overflow-hidden',
          'desktop:w-8/12 desktop:h-auto desktop:rounded-t-xl desktop:top-[50%] desktop:left-[50%] desktop:-translate-x-2/4	desktop:-translate-y-2/4 desktop:rounded-3xl',
          'desktop:grid desktop:grid-cols-2 desktop:gap-20 desktop:p-16',
        )}
      >
        <div className="w-full relative rounded-lg overflow-hidden">
          <Image src={ImageBio} alt="Self-portrait of Jimmy" objectFit="cover" fill />
        </div>
        <div className="w-full">
          <p className="font-serif desktop:text-xl leading-[160%]">
            My name is Jimmy, currently based in The Hague, Netherlands. Welcome to the space where
            I archive a selection of my favourite shots.
            <br />
            <br />
            After a good couple years of photographing, I've come to the realization that what I
            desire, is to take photos that are timeless, that viewers would come back over and over
            to look at. Photographs that make people feel the emotions within the frames and really
            having to think about them.
            <br />
            <br />
            While I embark on the journey towards that goal, I chose to use a digital archive as an
            intuitive way of recording how I am evolving as a creative. If you enjoy what you see,
            feel free to reach out! I am open to any inquiries, or just a message to meet up ;D
          </p>
        </div>
      </div>
      <div className="w-full h-[100dvh] bg-ivory-300 opacity-40 absolute z-10 top-0 left-0" />
    </>
  );
};

type AboutViewProps = {};
