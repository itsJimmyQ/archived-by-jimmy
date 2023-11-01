import * as React from 'react';

export const useDevice = () => {
  const [device, setDevice] = React.useState<Device | undefined>(undefined);

  React.useEffect(() => {
    const updateViewport = () => {
      const currViewport = getViewport();

      setDevice(currViewport);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const getViewport = () => {
    return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '') as Device;
  };

  return {
    device,
    isDeviceDetermined: !!device,
  };
};

type Device = 'mobile' | 'tablet' | 'desktop' | 'large';
