'use client';

import * as React from 'react';

export const ModalContext = React.createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openedModalId, setOpenedModalId] = React.useState<string | null>(null);

  const onOpenModal = (modalId: string) => {
    if (openedModalId === modalId) return;

    setOpenedModalId(modalId);
  };

  const onCloseModal = () => {
    setOpenedModalId(null);
  };

  return (
    <ModalContext.Provider
      value={{
        onOpenModal,
        onCloseModal,
        isModalOpened: Boolean(openedModalId),
        openedModalId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

type ModalContextProps = {
  onOpenModal: (modalId: string) => void;
  onCloseModal: () => void;
  isModalOpened: boolean;
  openedModalId: string | null;
};

type ModalProviderProps = {
  children: React.ReactNode;
};
