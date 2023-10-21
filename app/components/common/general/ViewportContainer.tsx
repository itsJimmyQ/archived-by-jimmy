'use client';

export const MobileContainer = ({ children }: ViewportContainerProps) => {
  return (
    <div className="w-full desktop:invisible desktop:opacity-0 desktop:hidden">{children}</div>
  );
};

export const DesktopContainer = ({ children }: ViewportContainerProps) => {
  return (
    <div className="w-full invisible opacity-0 hidden desktop:visible desktop:opacity-100 desktop:inline">
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
};
