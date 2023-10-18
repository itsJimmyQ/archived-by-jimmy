import type { Metadata } from 'next';
import Head from 'next/head';

import { Header, Providers } from 'common/general';

import './globals.css';

export const metadata: Metadata = {
  title: 'archived by jimmy',
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
        <Providers>
          <Header />
          <main className="w-full flex flex-1 px-6 lg:px-20 xl:px-32 cursor-none">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
