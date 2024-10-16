import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { StrictMode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';

import { Header, Providers } from 'common/general';

import './globals.css';

export const metadata: Metadata = {
  title: 'archived by jimmy',
  description:
    'a digital archive of my photographs, a place where I record my progress towards becoming a greater creative.',
};

const generalSansVariable = localFont({
  display: 'swap',
  src: './GeneralSans-Variable.woff2',
  variable: '--font-sans',
});

const erodeVariable = localFont({
  display: 'swap',
  src: 'Erode-Variable.woff2',
  variable: '--font-serif',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <StrictMode>
        <html lang="en">
          <body
            className={clsx(
              'w-screen h-[100dvh] flex flex-col gap-4 relative overflow-hidden bg-ivory-100',
              generalSansVariable.variable,
              erodeVariable.variable,
            )}
          >
            <Header />
            <main className={clsx('w-full flex-1')}>{children}</main>
          </body>
          {process.env.APP_ENV !== 'development' && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
          )}
        </html>
      </StrictMode>
    </Providers>
  );
};

export default RootLayout;
