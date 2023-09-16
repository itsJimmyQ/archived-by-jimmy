import * as React from 'react';

export const useViewport = () => {
  const [viewport, setViewport] = React.useState<Viewport | undefined>(undefined);

  React.useEffect(() => {
    const updateViewport = () => {
      const currViewport = getViewport();

      setViewport(currViewport);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const getViewport = () => {
    return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '') as Viewport;
  };

  return {
    viewport,
    isDetermined: !!viewport,
  };
};

type Viewport = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
