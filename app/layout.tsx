import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import clsx from 'clsx';

import { ViewportContainer } from 'common/general';
import { GalleryContextProvider } from 'contexts';
import { NavigationDesktop, NavigationMobile } from 'modules/navigation';

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
          'w-screen h-screen flex flex-col overflow-hidden bg-ivory-100',
          manrope.className,
        )}
      >
        <GalleryContextProvider>
          <main className="w-full flex flex-1">{children}</main>
          <div className="w-full flex items-center">
            <ViewportContainer.Desktop>
              <NavigationDesktop />
            </ViewportContainer.Desktop>
            <ViewportContainer.Mobile>
              <NavigationMobile />
            </ViewportContainer.Mobile>
          </div>
        </GalleryContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
