'use client';

import * as React from 'react';
import * as i from 'types';

import { useDevice, useLoadImages } from 'hooks';
import { getImages } from 'queries/images';

export const GalleryContext = React.createContext<GalleryContext | null>(null);

export const GalleryProvider = ({ children }: GalleryProviderProps) => {
  const [imageGroups, setImageGroups] = React.useState<i.FormattedImage[][]>([]);
  const [isPreloadRequired, setIsPreloadRequired] = React.useState<boolean>(true);
  const [currGroupIndex, setCurrGroupIndex] = React.useState<number>(0);

  const { device } = useDevice();

  const activeImages = imageGroups[currGroupIndex];
  const preloadedImages = useLoadImages(imageGroups[currGroupIndex + 1], isPreloadRequired);

  let amountColumns: number | undefined = undefined;
  let spaces: Record<i.GalleryImageOrientation, number> | undefined = undefined;
  switch (device) {
    case 'mobile':
    case 'tablet':
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

  React.useEffect(() => {
    if (!amountColumns) return;

    getImages().then((res) => setImageGroups(groupImages(res.results, amountColumns!)));
  }, [amountColumns]);

  React.useEffect(() => {
    if (preloadedImages.length === 0 || currGroupIndex === imageGroups.length - 1) return;

    const newImageGroup = [...imageGroups];
    newImageGroup[currGroupIndex + 1] = preloadedImages;

    setImageGroups(newImageGroup);
    setIsPreloadRequired(false);
  }, [preloadedImages]);

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

      currImageGroup.push(currImage);
      remainingImages.splice(i, 1);
      remainingSpaces -= spaces![currImage.orientation];
      i--;

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
    let newGroupIndex: number | undefined = undefined;

    if (currGroupIndex < imageGroups.length - 1) {
      newGroupIndex = currGroupIndex + 1;

      if (newGroupIndex === imageGroups.length - 1) {
        setIsPreloadRequired(false);
      } else {
        setIsPreloadRequired(true);
      }
    } else {
      newGroupIndex = 0;
    }

    setCurrGroupIndex(newGroupIndex);
  };

  return (
    <GalleryContext.Provider
      value={{
        activeImages: activeImages,
        amountImages: imageGroups.flat().length,
        isReady: imageGroups.length > 0,
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
