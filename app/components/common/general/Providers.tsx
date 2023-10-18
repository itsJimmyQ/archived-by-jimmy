'use client';

import { CursorProvider, GalleryProvider } from 'contexts';

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <GalleryProvider>
      <CursorProvider>{children}</CursorProvider>
    </GalleryProvider>
  );
};

type ProvidersProps = {
  children: React.ReactNode;
};
