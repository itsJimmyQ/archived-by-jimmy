import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import clsx from 'clsx';

import { Cursor } from 'common/interactions';
import { GalleryContextProvider } from 'contexts';

import './globals.css';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Archived by jimmy',
  description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={clsx(
          'w-screen h-screen flex flex-col relative overflow-hidden bg-ivory-100',
          manrope.className,
        )}
      >
        <GalleryContextProvider>
          <Cursor />
          <main className="w-full flex flex-1">{children}</main>
        </GalleryContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
