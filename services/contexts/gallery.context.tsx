'use client';

import * as React from 'react';
import * as i from 'types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useDevice, useLoadImages } from 'hooks';
import { getImages } from 'queries/images';
import { isServer } from 'services/isServer';

dayjs.extend(relativeTime);

export const GalleryContext = React.createContext<GalleryContext | null>(null);

export const GalleryProvider = ({ children }: GalleryProviderProps) => {
  const [imageGroups, setImageGroups] = React.useState<i.FormattedImage[][]>([]);
  const [activeGroupIndex, setActiveGroupIndex] = React.useState<number>(0);
  const [isPreloadRequired, setIsPreloadRequired] = React.useState<boolean>(true);
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string | undefined>(undefined);
  const [isImageGroupsReady, setIsImageGroupsReady] = React.useState<boolean>(false);

  const preloadedImages = useLoadImages(imageGroups[activeGroupIndex + 1], isPreloadRequired);
  const { device, isDeviceDetermined } = useDevice();

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
    default:
      amountColumns = 6;
      spaces = {
        portrait: 2,
        landscape: 2,
        square: 2,
      };
  }

  // Fetch and group images from Contentful
  React.useEffect(() => {
    if (!amountColumns || !isDeviceDetermined) return;

    getImages().then((res) => {
      let currImageGroups: i.FormattedImage[][] = [];

      if (amountColumns === 1) {
        currImageGroups = res.results.map((image) => [image]);
      } else {
        currImageGroups = groupImages(res.results, amountColumns!);
      }

      setLastUpdatedAt(res.last_updated_at);
      setImageGroups(currImageGroups);
      setIsImageGroupsReady(true);
    });
  }, [amountColumns, isDeviceDetermined]);

  React.useEffect(() => {
    if (!isImageGroupsReady || preloadedImages.length === 0) return;

    const updatedImageGroups = [...imageGroups];
    updatedImageGroups[activeGroupIndex + 1] = preloadedImages;

    setImageGroups(updatedImageGroups);
    setIsPreloadRequired(false);
  }, [preloadedImages, isImageGroupsReady]);

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
    let newActiveGroupIndex: number | undefined = undefined;
    let isPreloadRequired = true;
    const maxGroupIndex = imageGroups.length - 1;

    if (activeGroupIndex < maxGroupIndex) {
      newActiveGroupIndex = activeGroupIndex + 1;

      if (activeGroupIndex === maxGroupIndex - 1) {
        isPreloadRequired = false;
      }
    } else {
      newActiveGroupIndex = 0;
      isPreloadRequired = false;
    }

    setIsPreloadRequired(isPreloadRequired);
    setActiveGroupIndex(newActiveGroupIndex);
  };

  return (
    <GalleryContext.Provider
      value={{
        activeImages: imageGroups[activeGroupIndex],
        amountImages: imageGroups.flat().length,
        lastUpdatedAt: dayjs().to(dayjs(lastUpdatedAt)),
        isReady:
          imageGroups.length > 0 && imageGroups[activeGroupIndex].length > 0 && !!lastUpdatedAt,
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
  lastUpdatedAt: string | undefined;
  isReady: boolean;
  onShuffleImages: () => void;
};
