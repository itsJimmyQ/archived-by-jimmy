'use client';

import { GalleryProvider, ModalProvider } from 'contexts';

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <GalleryProvider>
      <ModalProvider>{children}</ModalProvider>
    </GalleryProvider>
  );
};

type ProvidersProps = {
  children: React.ReactNode;
};
