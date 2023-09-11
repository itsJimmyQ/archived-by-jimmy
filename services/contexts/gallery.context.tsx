'use client';

import * as React from 'react';
import * as i from 'types';

import { getImages } from 'queries/images';
import { preloadImage } from 'services/preloadImage';

export const GalleryContext = React.createContext<GalleryContext | null>(null);

const SPACES = {
  portrait: 1,
  landscape: 2,
  square: 2,
};

const AMOUNT_COLUMNS = 4;

export const GalleryContextProvider = ({ children }: GalleryContextProviderProps) => {
  const [availableImages, setAvailableImages] = React.useState<i.FormattedImage[]>([]);
  const [imageGroups, setImageGroups] = React.useState<i.FormattedImage[][]>([]);
  const [currGroupIndex, setCurrGroupIndex] = React.useState<number>(0);
  const [isReady, setIsReady] = React.useState<boolean>(false);

  // Initial setup
  React.useEffect(() => {
    getImages().then(async (res) => {
      const images = res.results;
      const imageGroups = groupImages(images);
      const initialImageGroup = imageGroups[0];
      const nextImageGroup = imageGroups[1];

      // Load initial group and next group of images
      await Promise.all(
        [...initialImageGroup, ...nextImageGroup].map((image) => preloadImage(image.src)),
      ).then(() => {
        setImageGroups(imageGroups);
        setAvailableImages(images);
        setIsReady(true);
      });
    });
  }, []);

  // Form image groups until there's no remaining orphan images
  const groupImages = (images: i.FormattedImage[]) => {
    const imageGroups: i.FormattedImage[][] = [];
    let currImages = [...images];
    let counter = 0;

    while (currImages.length > 0 && counter < 10000) {
      const { imageGroup, remainingImages } = formImageGroup(currImages);

      currImages = remainingImages;
      imageGroups.push(imageGroup);
      counter++;
    }

    return imageGroups;
  };

  // Form an image group based on available images, their sizes and the total amount of columns
  const formImageGroup = (images: i.FormattedImage[]) => {
    const remainingImages = [...images];
    const currImageGroup: i.FormattedImage[] = [];
    let remainingSpaces = AMOUNT_COLUMNS;

    for (let i = 0; i < remainingImages.length; i++) {
      const currImage = remainingImages[i];

      if (SPACES[currImage.orientation] > remainingSpaces) {
        continue;
      }

      currImageGroup.push(currImage);
      remainingImages.splice(i, 1);
      remainingSpaces -= SPACES[currImage.orientation];

      if (remainingSpaces === 0) {
        break;
      }
    }

    return {
      imageGroup: currImageGroup,
      remainingImages,
    };
  };

  const onShuffleImages = () => {
    if (currGroupIndex < imageGroups.length - 2) {
      setCurrGroupIndex(currGroupIndex + 1);
    } else {
      setCurrGroupIndex(0);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        activeImages: imageGroups[currGroupIndex],
        nextImages: imageGroups[currGroupIndex + 1],
        amountImages: availableImages.length,
        isReady,
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
  amountImages: number;
  isReady: boolean;
  onShuffleImages: () => void;
};
