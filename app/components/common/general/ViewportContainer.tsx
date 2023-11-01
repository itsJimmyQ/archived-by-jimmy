'use client';

import clsx from 'clsx';

export const MobileContainer = ({ children, className }: ViewportContainerProps) => {
  return (
    <div className={clsx('desktop:invisible desktop:opacity-0 desktop:hidden', className)}>
      {children}
    </div>
  );
};

export const DesktopContainer = ({ children }: ViewportContainerProps) => {
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

export const ViewportContainer = {
  Desktop: DesktopContainer,
  Mobile: MobileContainer,
};

type ViewportContainerProps = {
  children: React.ReactNode;
  className?: string;
};
