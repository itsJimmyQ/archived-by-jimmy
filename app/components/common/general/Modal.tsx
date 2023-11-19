'use client';

import { createPortal } from 'react-dom';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { isServer } from 'services/isServer';
import IconClose from 'vectors/close.svg';

import { Icon } from './Icon';

const ModalRoot = ({ children, isOpened, onCloseModal }: ModalRootProps) => {
  if (isServer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpened && (
        <>
          {children}
          <Modal.Overlay onClick={onCloseModal} />
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

type ModalRootProps = {
  children: React.ReactNode;
  isOpened: boolean;
  onCloseModal: () => void;
};

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return (
    <motion.div
      className="w-full h-[100dvh] bg-ivory-300 opacity-60 absolute z-10 top-0 left-0 cursor-pointer"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 0.8,
          transition: {
            duration: 0.3,
            ease: 'ease',
          },
        },
      }}
      initial="initial"
      animate="animate"
      exit="initial"
      {...{ onClick }}
    />
  );
};

type ModalOverlayProps = {
  onClick?: () => void;
};

const ModalBody = ({ children }: ModalBodyProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          opacity: 'var(--opacity-from)',
          scale: 'var(--scale-from)',
          translate: 'var(--translate-from)',
        },
        animate: {
          opacity: 'var(--opacity-to)',
          scale: 'var(--scale-to)',
          translate: 'var(--translate-to)',
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        },
      }}
      initial="initial"
      animate="animate"
      exit="initial"
      className={clsx(
        // Mobile
        'w-screen h-max max-h-[calc(100dvh-40px)] absolute bottom-0 rounded-t-3xl bg-ivory-100 z-30 overflow-hidden',
        // Desktop
        'desktop:w-10/12 large:w-8/12 desktop:h-max desktop:top-1/2 desktop:left-1/2 desktop:transform desktop:-translate-x-1/2 desktop:-translate-y-1/2',
        'desktop:rounded-2xl flex flex-col',
        '[--scale-from:1] [--scale-to:1] [--translate-from:0%_100%] [--translate-to:0%_0%] [--opacity-from:100%] [--opacity-to:100%]',
        'desktop:[--scale-from:1.03] desktop:[--scale-to:1] desktop:[--translate-from:-50%_-50%] desktop:[--translate-to:-50%_-50%] desktop:[--opacity-from:0%] desktop:[--opacity-to:100%]',
      )}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </motion.div>
  );
};

type ModalBodyProps = {
  children: React.ReactNode;
};

const ModalHeader = ({ title, onCloseModal }: ModalHeaderProps) => {
  return (
    <div className={clsx('w-full py-2 bg-ivory-200 rounded-t-3xl z-20 relative')}>
      <h6 className="font-medium text-ivory-300 text-center">{title}</h6>
      <Icon
        icon={IconClose}
        color="ivory"
        className="absolute top-[50%] right-6 translate-y-[-50%]"
        title="Close 'about & contact'"
        onClick={onCloseModal}
      />
    </div>
  );
};

type ModalHeaderProps = {
  title: string;
  onCloseModal: () => void;
};

const ModalContent = ({ children }: ModalContentProps) => {
  return <div className={clsx('w-full overflow-auto px-6 py-12', 'desktop:px-16')}>{children}</div>;
};

type ModalContentProps = {
  children: React.ReactNode;
};

export const Modal = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Body: ModalBody,
  Header: ModalHeader,
  Content: ModalContent,
};
