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
const TOTAL_COLS = 4;
const TOTAL_ROWS = 2;

// 1. Get a random image
// 2. Check its orientation
// 3. Compute remaining spaces
// 4. Get another random image
// 5. Check its orientation
// 6. Compute remaining spaces
// 7. Repeat until remaining spaces is 0
// 8. If remaining spaces is 0, push the images to the active images

export const GalleryContextProvider = ({ children }: GalleryContextProviderProps) => {
  const [activeImages, setActiveImages] = React.useState<i.FormattedImage[]>([]);
  const [loadedImages, setLoadedImages] = React.useState<i.FormattedImage[]>([]);
  const [amountImages, setAmountImages] = React.useState<number | undefined>(undefined);
  const [guardImageIndex, setGuardImageIndex] = React.useState<number | undefined>(undefined);

  const progress =
    amountImages === undefined ? 0 : Math.round((loadedImages.length / amountImages) * 100);

  // Initial config and preloading images
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

  const getRandomImage = (guardIndex: number) => {
    console.log(guardIndex);
    // Get a random index within the range of [0, guardImageIndex]
    const randomIndex = Math.floor(Math.random() * guardIndex);
    const randomImage = loadedImages[randomIndex];

    return {
      image: randomImage,
      index: randomIndex,
    };
  };

  const getRandomImages = () => {
    if (guardImageIndex === undefined)
      return {
        shuffledImages: loadedImages,
        updatedGuardIndex: loadedImages.length,
        activeImages: loadedImages.slice(7),
      };

    let images: i.FormattedImage[] = [];
    let remainingSpaces = TOTAL_COLS;
    let rowCounter = 0;
    let localGuardImageIndex = guardImageIndex;
    const shuffledImages = [...loadedImages];

    while (remainingSpaces > 0 && rowCounter < TOTAL_ROWS) {
      const { image: currImage, index: currIndex } = getRandomImage(localGuardImageIndex);

      if (SPACES[currImage.orientation] > remainingSpaces) continue;

      // Upadte remaining spaces
      remainingSpaces -= SPACES[currImage.orientation];

      // Put the image to the end of list
      shuffledImages.splice(currIndex, 1);
      shuffledImages.push(currImage);

      // Add the image to the active images
      images.push(currImage);

      // Update local variables
      if (localGuardImageIndex === 0) localGuardImageIndex = loadedImages.length - 1;
      else localGuardImageIndex -= 1;

      if (remainingSpaces === 0 && rowCounter < TOTAL_ROWS) {
        rowCounter += 1;
        remainingSpaces = TOTAL_COLS;
      }
    }

    return {
      shuffledImages,
      updatedGuardIndex: localGuardImageIndex,
      activeImages: images,
    };
  };

  const onShuffleImages = () => {
    const { shuffledImages, updatedGuardIndex, activeImages } = getRandomImages();

    setLoadedImages(shuffledImages);
    setActiveImages(activeImages);
    setGuardImageIndex(updatedGuardIndex);
  };

  return (
    <GalleryContext.Provider
      value={{
        images: loadedImages,
        activeImages,
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
  activeImages: i.FormattedImage[];
  images: i.FormattedImage[];
  progress: number;
  onShuffleImages: () => void;
};
