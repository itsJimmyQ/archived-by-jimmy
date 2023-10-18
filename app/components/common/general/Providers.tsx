'use client';

import { GalleryProvider } from 'contexts';

export const Providers = ({ children }: ProvidersProps) => {
  return <GalleryProvider>{children}</GalleryProvider>;
};

type ProvidersProps = {
  children: React.ReactNode;
};
