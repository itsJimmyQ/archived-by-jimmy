'use client';

export const MobileContainer = ({ children }: ViewportContainerProps) => {
  return <div className="w-full sm:invisible sm:opacity-0 sm:hidden">{children}</div>;
};

export const DesktopContainer = ({ children }: ViewportContainerProps) => {
  return (
    <div className="w-full invisible opacity-0 hidden sm:visible sm:opacity-100 sm:inline">
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
