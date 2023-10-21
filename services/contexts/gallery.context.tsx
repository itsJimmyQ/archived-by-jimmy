'use client';

import * as React from 'react';
import * as i from 'types';

import { useDevice, useLoadImages } from 'hooks';
import { getImages } from 'queries/images';

export const GalleryContext = React.createContext<GalleryContext | null>(null);

export const GalleryProvider = ({ children }: GalleryProviderProps) => {
  const [availableImages, setAvailableImages] = React.useState<i.FormattedImage[]>([]);
  const [imageGroups, setImageGroups] = React.useState<i.FormattedImage[][]>([]);
  const [currGroupIndex, setCurrGroupIndex] = React.useState<number>(0);
  const [isReady, setIsReady] = React.useState<boolean>(false);

  const loadedImages = useLoadImages(availableImages);
  const { device, isDetermined: isDeviceDetermined } = useDevice();

  let amountColumns: number | undefined = undefined;
  let spaces: Record<i.GalleryImageOrientation, number> | undefined = undefined;
  switch (device) {
    case 'mobile':
      amountColumns = 1;
      spaces = {
        portrait: 1,
        landscape: 1,
        square: 1,
      };

      break;
    case 'desktop':
      amountColumns = 6;
      spaces = {
        portrait: 2,
        landscape: 2,
        square: 2,
      };

      break;
    default:
      amountColumns = 6;
      spaces = {
        portrait: 2,
        landscape: 2,
        square: 2,
      };
  }

  // Initial setup
  React.useEffect(() => {
    getImages().then((res) => setAvailableImages(res.results));
  }, []);

  React.useEffect(() => {
    if (!isDeviceDetermined || loadedImages.length === 0) return;

    const imageGroups = groupImages(loadedImages, amountColumns!);

    // Load initial group and next group of images
    setImageGroups(imageGroups);
    setIsReady(true);
  }, [loadedImages, device]);

  // Form image groups until there's no remaining orphan images
  const groupImages = (images: i.FormattedImage[], groupSize: number) => {
    const imageGroups: i.FormattedImage[][] = [];
    let currImages = [...images];

    while (currImages.length > 0) {
      const { imageGroup, remainingImages } = formImageGroup(currImages, groupSize);

      currImages = remainingImages;
      imageGroups.push(imageGroup);
    }

    return imageGroups;
  };

  // Form an image group based on available images, their sizes and the total amount of columns
  const formImageGroup = (images: i.FormattedImage[], groupSize: number) => {
    const remainingImages = [...images];
    const currImageGroup: i.FormattedImage[] = [];
    let remainingSpaces = groupSize;

    for (let i = 0; i < remainingImages.length; i++) {
      const currImage = remainingImages[i];

      if (spaces![currImage.orientation] > remainingSpaces) {
        continue;
      }

      currImageGroup.push(currImage);
      remainingImages.splice(i, 1);
      remainingSpaces -= spaces![currImage.orientation];

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
        amountImages: availableImages.length,
        isReady,
        onShuffleImages,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

type GalleryProviderProps = {
  children: React.ReactNode;
};

type GalleryContext = {
  activeImages: i.FormattedImage[];
  amountImages: number;
  isReady: boolean;
  onShuffleImages: () => void;
};
