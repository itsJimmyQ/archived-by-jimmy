import { IncomingMessagePayload, OutgoingMessagePayload } from './types';

self.addEventListener('message', async (event) => {
  const payload: IncomingMessagePayload = event.data;
  const images = payload.images;

  const loadedImages = await Promise.all(
    images.map(async (currImage) => {
      try {
        const res = await fetch(currImage.src);
        const imageBlob = await res.blob();
        const imageSrc = URL.createObjectURL(imageBlob);

        return { ...currImage, src: imageSrc };
      } catch (err) {
        return null;
      }
    }),
  );

  self.postMessage({
    images: loadedImages.filter((imageLoaded) => Boolean(imageLoaded)),
  } as OutgoingMessagePayload);
});
