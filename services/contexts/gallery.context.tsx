'use client';

import { FormattedImage } from 'types';
import * as React from 'react';
import { getImages } from 'queries/images';
import { preloadImage } from 'services/preloadImage';

export const GalleryContext = React.createContext<GalleryContext | null>(null);

export const GalleryContextProvider = ({ children }: GalleryContextProviderProps) => {
  const [loadedImages, setLoadedImages] = React.useState<FormattedImage[]>([]);
  const [amountImages, setAmountImages] = React.useState<number | undefined>(undefined);
  const [activeImage, setActiveImage] = React.useState<FormattedImage | undefined>(undefined);
  const [guardImageIndex, setGuardImageIndex] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    getImages().then(async (res) => {
      const images = res.results;
      const amountImages = images.length;
      const initialImage = images.shift();

      if (!initialImage) return;

      setAmountImages(amountImages);
      setGuardImageIndex(amountImages - 1);

      // Prioritize an intial image to be loaded first
      await preloadImage(initialImage.src).then(() => {
        setActiveImage(initialImage);
        setLoadedImages((currImages) => [...currImages, initialImage]);
      });

      // Then preload the rest of the images
      images.forEach((image) => {
        preloadImage(image.src).then(() => {
          setLoadedImages((currImages) => [...currImages, image]);
        });
      });
    });
  }, []);

  const onGetRandomImage = () => {
    if (guardImageIndex === undefined) return;

    // Get a random index within the range of [0, guardImageIndex]
    const randomIndex = Math.floor(Math.random() * guardImageIndex);
    // Push the new image to the end of the list
    const updatedImages = [...loadedImages];
    const randomImage = updatedImages.splice(randomIndex, 1)[0];
    updatedImages.push(randomImage);

    setActiveImage(randomImage);
    setLoadedImages(updatedImages);

    // Reset guard index when the entire list is traversed
    if (guardImageIndex === 0) {
      setGuardImageIndex(loadedImages.length - 1);
    } else {
      setGuardImageIndex(guardImageIndex - 1);
    }
  };

  const progress =
    amountImages === undefined ? 0 : Math.round((loadedImages.length / amountImages) * 100);

  return (
    <GalleryContext.Provider
      value={{
        images: loadedImages,
        activeImage,
        progress,
        onGetRandomImage,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

type GalleryContextProviderProps = {
  children: React.ReactNode;
};

type GalleryContext = {
  activeImage: FormattedImage | undefined;
  images: FormattedImage[];
  progress: number;
  onGetRandomImage: () => void;
};
