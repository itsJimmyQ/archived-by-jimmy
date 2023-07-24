'use client';

import * as i from 'types';
import * as React from 'react';
import { getImages } from 'queries/images';
import { preloadImage } from 'services/preloadImage';

export const GalleryContext = React.createContext<GalleryContext | null>(null);

const SPACES = {
  portrait: 1,
  landscape: 2,
  square: 2,
};
const TOTAL_SPACES = 4;

export const GalleryContextProvider = ({ children }: GalleryContextProviderProps) => {
  const [activeTopImages, setActiveTopImages] = React.useState<i.FormattedImage[]>([]);
  const [activeBottomImages, setActiveBottomImages] = React.useState<i.FormattedImage[]>([]);
  const [loadedImages, setLoadedImages] = React.useState<i.FormattedImage[]>([]);
  const [amountImages, setAmountImages] = React.useState<number | undefined>(undefined);
  const [guardImageIndex, setGuardImageIndex] = React.useState<number | undefined>(undefined);

  const progress =
    amountImages === undefined ? 0 : Math.round((loadedImages.length / amountImages) * 100);

  React.useEffect(() => {
    getImages().then((res) => {
      const images = res.results;
      const amountImages = images.length;

      setAmountImages(amountImages);
      setGuardImageIndex(amountImages - 1);

      images.forEach((image) => {
        preloadImage(image.src).then(() => {
          setLoadedImages((currImages) => [...currImages, image]);
        });
      });
    });
  }, []);

  React.useEffect(() => {
    if (progress < 100) return;

    onShuffleImages();
  }, [progress]);

  const getRandomImages = (position: 'TOP' | 'BOTTOM') => {
    const activeImages: i.FormattedImage[] = [];
    let remainingSpaces = TOTAL_SPACES;

    while (remainingSpaces > 0) {
      const currImage = getRandomImage();
      const currOrientation = currImage.orientation;
      const currImageSpaces = SPACES[currOrientation];

      // Skip if the image does not fix the remaining spaces
      // or if the image is already active
      if (currImageSpaces > remainingSpaces) continue;
      if (activeImages.find((image) => image.src === currImage.src)) continue;
      else {
        activeImages.push(currImage);
        remainingSpaces -= currImageSpaces;
      }
    }

    if (position === 'TOP') setActiveTopImages(activeImages);
    else setActiveBottomImages(activeImages);
  };

  const getRandomImage = () => {
    if (guardImageIndex === undefined) return loadedImages[0];

    // Get a random index within the range of [0, guardImageIndex]
    const randomIndex = Math.floor(Math.random() * guardImageIndex);
    // Push the new image to the end of the list
    const updatedImages = [...loadedImages];
    const randomImage = updatedImages.splice(randomIndex, 1)[0];
    updatedImages.push(randomImage);

    setLoadedImages(updatedImages);

    // Reset guard index when the entire list is traversed
    if (guardImageIndex === 0) {
      setGuardImageIndex(loadedImages.length - 1);
    } else {
      setGuardImageIndex(guardImageIndex - 1);
    }

    return randomImage;
  };

  const onShuffleImages = () => {
    getRandomImages('TOP');
    getRandomImages('BOTTOM');
  };

  return (
    <GalleryContext.Provider
      value={{
        images: loadedImages,
        activeTopImages,
        activeBottomImages,
        progress,
        onShuffleImages,
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
  activeTopImages: i.FormattedImage[];
  activeBottomImages: i.FormattedImage[];
  images: i.FormattedImage[];
  progress: number;
  onShuffleImages: () => void;
};
