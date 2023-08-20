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
const TOTAL_COLS = 5;
const TOTAL_ROWS = 1;

export const GalleryContextProvider = ({ children }: GalleryContextProviderProps) => {
  const [activeImages, setActiveImages] = React.useState<ActiveImages>({
    currBatch: [],
    nextBatch: [],
  });
  const [availableImages, setAvailableImages] = React.useState<i.FormattedImage[]>([]);
  const [guardImageIndex, setGuardImageIndex] = React.useState<number | undefined>(undefined);
  const [isReady, setIsReady] = React.useState<boolean>(false);

  // Initial setup
  React.useEffect(() => {
    getImages().then((res) => {
      const images = res.results;
      const amountImages = images.length;

      setGuardImageIndex(amountImages - 1);
      setAvailableImages(images);
      setIsReady(true);
    });
  }, []);

  // Get initial images after initial setup
  React.useEffect(() => {
    if (!isReady || guardImageIndex === undefined) return;

    getInitialImages(availableImages, guardImageIndex);
  }, [isReady]);

  // Preload next batch of images
  React.useEffect(() => {
    if (activeImages.nextBatch.length === 0) return;

    Promise.all(activeImages.nextBatch.map((image) => preloadImage(image.src)));
  }, [activeImages.nextBatch]);

  const getRandomImage = (images: i.FormattedImage[], guardIndex: number) => {
    // Get a random index within the range of [0, guardImageIndex]
    const randomIndex = Math.floor(Math.random() * guardIndex);
    const randomImage = images[randomIndex];

    return {
      image: randomImage,
      index: randomIndex,
    };
  };

  // 1. Get a random image
  // 2. Check its orientation
  // 3. Compute remaining spaces
  // 4. Get another random image
  // 5. Check its orientation
  // 6. Compute remaining spaces
  // 7. Repeat until remaining spaces is 0
  // 8. If remaining spaces is 0, push the images to the active images
  const getRandomImages = (images: i.FormattedImage[], guardIndex: number | undefined) => {
    if (guardIndex === undefined) {
      return {
        shuffledImages: images,
        updatedGuardIndex: images.length,
        activeImages: images.slice(7),
      };
    }

    let localImages: i.FormattedImage[] = [];
    let remainingSpaces = TOTAL_COLS;
    let rowCounter = 0;
    let localGuardImageIndex = guardIndex;
    const shuffledImages = [...images];

    // Loop as long as there's still spaces left to be filled and there's still images to be searched
    while (remainingSpaces > 0) {
      const { image: currImage, index: currIndex } = getRandomImage(
        shuffledImages,
        localGuardImageIndex,
      );

      // Skip iteration if the image does not fit the remaining spaces
      if (SPACES[currImage.orientation] > remainingSpaces) continue;

      // Update remaining spaces
      remainingSpaces -= SPACES[currImage.orientation];
      // Put the image to the end of list
      shuffledImages.splice(currIndex, 1);
      shuffledImages.push(currImage);
      // Add the image to the active images
      localImages.push(currImage);

      // Update local variables
      if (localGuardImageIndex === 0) localGuardImageIndex = availableImages.length - 1;
      else localGuardImageIndex -= 1;

      // If theres still rows left to be filled, reset the remaining spaces
      if (remainingSpaces === 0 && rowCounter < TOTAL_ROWS - 1) {
        rowCounter += 1;
        remainingSpaces = TOTAL_COLS;
      }
    }

    return {
      shuffledImages,
      updatedGuardIndex: localGuardImageIndex,
      activeImages: localImages,
    };
  };

  // 1. Get initial batch of images
  // 2. Get next batch of images
  // 3. Preload next batch of images
  // 4. On shuffle, use next batch of images as active images
  // 5. Preload another batch of images
  const getInitialImages = (images: i.FormattedImage[], guardIndex: number) => {
    // Current batch
    const {
      shuffledImages: currShuffledImages,
      updatedGuardIndex: currGuardIndex,
      activeImages: currActivetImages,
    } = getRandomImages(images, guardIndex);

    // Next batch
    const {
      shuffledImages: nextShuffledImages,
      updatedGuardIndex: nextGuardIndex,
      activeImages: nextActiveImages,
    } = getRandomImages(currShuffledImages, currGuardIndex);

    setAvailableImages(nextShuffledImages);
    setActiveImages({
      currBatch: currActivetImages,
      nextBatch: nextActiveImages,
    });
    setGuardImageIndex(nextGuardIndex);
  };

  const onShuffleImages = () => {
    const newCurrBatch = activeImages.nextBatch;

    // Get next batch
    const {
      shuffledImages: nextShuffledImages,
      updatedGuardIndex: nextGuardIndex,
      activeImages: nextActiveImages,
    } = getRandomImages(availableImages, guardImageIndex);

    setActiveImages({
      currBatch: newCurrBatch,
      nextBatch: nextActiveImages,
    });
    setAvailableImages(nextShuffledImages);
    setGuardImageIndex(nextGuardIndex);
  };

  return (
    <GalleryContext.Provider
      value={{
        images: availableImages,
        activeImages: activeImages.currBatch,
        nextImages: activeImages.nextBatch,
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
  nextImages: i.FormattedImage[];
  images: i.FormattedImage[];
  onShuffleImages: () => void;
};

type ActiveImages = {
  currBatch: i.FormattedImage[];
  nextBatch: i.FormattedImage[];
};
