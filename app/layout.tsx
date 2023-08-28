import { GalleryContextProvider } from 'contexts';
import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import clsx from 'clsx';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Archived by jimmy',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-screen h-screen">
      <body className={clsx('w-full h-full', manrope.className)}>
        <GalleryContextProvider>{children}</GalleryContextProvider>
      </body>
    </html>
  );
}
