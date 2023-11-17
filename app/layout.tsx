import type { Metadata } from 'next';
import Head from 'next/head';
import { StrictMode } from 'react';

import clsx from 'clsx';

import { Header, Providers } from 'common/general';

import './globals.css';

export const metadata: Metadata = {
  title: 'archived by jimmy',
  description:
    'a digital archive of my photographs. a place where I record my progress towards becoming a greater creative.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <StrictMode>
        <html lang="en">
          <Head>
            <link
              href="https://api.fontshare.com/v2/css?f[]=erode@500,600,601&f[]=general-sans@500,400&display=swap"
              rel="stylesheet"
            />
          </Head>
          <body
            className={clsx(
              'w-screen h-[100dvh] flex flex-col relative overflow-hidden bg-ivory-100',
            )}
          >
            <Header />
            <main
              className={clsx(
                'w-full flex flex-col flex-1',
                'px-6 tablet:px-6 desktop:px-12 large:px-32',
              )}
            >
              {children}
            </main>
          </body>
        </html>
      </StrictMode>
    </Providers>
  );
};

export default RootLayout;
