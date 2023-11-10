import * as React from 'react';
import * as i from 'types';

import { OutgoingMessagePayload } from 'services/workers/types';

export const useLoadImages = (images: i.FormattedImage[], isPreloadRequired: boolean) => {
  const [worker, setWorker] = React.useState<Worker>();
  const [loadedImages, setLoadedImages] = React.useState<i.FormattedImage[]>([]);

  // Web worker setup
  React.useEffect(() => {
    if (!window.Worker) return;

    const currWorker = new Worker(new URL('../workers/gallery.worker.ts', import.meta.url));

    currWorker.addEventListener('message', onMessage);
    setWorker(currWorker);

    return () => {
      worker?.terminate();
    };
  }, []);

  React.useEffect(() => {
    if (!worker || images.length === 0 || !isPreloadRequired) return;

    worker.postMessage({ images });
  }, [images]);

  const onMessage = (e: MessageEvent<OutgoingMessagePayload>) => {
    setLoadedImages(e.data.images);
  };

  return loadedImages;
};
