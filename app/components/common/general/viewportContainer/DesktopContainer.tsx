'use client';

import clsx from 'clsx';

export const DesktopContainer = ({ children }: DesktopContainerProps) => {
  return (
    <div
      className={clsx(
        'invisible opacity-0 hidden desktop:visible desktop:opacity-100 desktop:inline',
      )}
    >
      {children}
    </div>
  );
};

type DesktopContainerProps = {
  children: React.ReactNode;
  className?: string;
};
