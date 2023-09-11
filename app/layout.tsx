import type { Metadata } from 'next';
import Head from 'next/head';

import { Header } from 'common/general';
import { Cursor } from 'common/interactions';
import { GalleryContextProvider } from 'contexts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Archived by jimmy',
  description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=erode@500,600,601&f[]=general-sans@500,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={'w-screen h-screen flex flex-col relative overflow-hidden bg-ivory-100'}>
        <Header />
        <GalleryContextProvider>
          <Cursor />
          <main className="w-full flex flex-1">{children}</main>
        </GalleryContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
