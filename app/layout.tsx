import type { Metadata } from 'next';
import Head from 'next/head';

import { Header } from 'common/general';
import { GalleryProvider } from 'contexts';

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
      <GalleryProvider>
        <body className={'w-screen h-screen flex flex-col relative overflow-hidden bg-ivory-100'}>
          <Header />
          <main className="w-full flex flex-1 px-6 lg:px-20 xl:px-32">{children}</main>
        </body>
      </GalleryProvider>
    </html>
  );
};

export default RootLayout;
