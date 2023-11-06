'use client';

import * as React from 'react';

import { motion } from 'framer-motion';

import { ViewportContainer } from 'common/general';
import { useModal } from 'hooks/useModal';
import { AboutViewDesktop, AboutViewMobile } from 'modules/about';

const variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

export const RootWrapper = ({ children }: RootWrapperProps) => {
  const { isModalOpened } = useModal();

  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        animate={isModalOpened ? 'animate' : 'initial'}
        className="w-full h-full flex flex-col origin-top desktop:origin-center"
      >
        {children}
      </motion.div>
      <ViewportContainer.Desktop>
        <AboutViewDesktop />
      </ViewportContainer.Desktop>
      <ViewportContainer.Mobile>
        <AboutViewMobile />
      </ViewportContainer.Mobile>
    </>
  );
};

type RootWrapperProps = {
  children: React.ReactNode;
};
