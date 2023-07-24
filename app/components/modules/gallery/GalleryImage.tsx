import * as React from 'react';

export const GalleryImage = ({ src, alt, orientation }: GalleryImageProps) => {
  let amountColumns;
  if (orientation === 'portrait') amountColumns = 1;
  else if (orientation === 'landscape') amountColumns = 2;

  return (
    <div className={`w-full h-full col-span-${amountColumns}`}>
      <img className="w-full h-full object-cover" {...{ src, alt }} />
    </div>
  );
};

type GalleryImageProps = {
  src: string;
  alt: string;
  orientation: 'landscape' | 'portrait' | 'square';
};
