'use client';

import clsx from 'clsx';

export const MobileContainer = ({ children, className }: MobileContainer) => {
  return (
    <div className={clsx('desktop:invisible desktop:opacity-0 desktop:hidden', className)}>
      {children}
    </div>
  );
};

type MobileContainer = {
  children: React.ReactNode;
  className?: string;
};
