import * as i from 'types';
import * as React from 'react';

import { GalleryContext } from 'contexts';

export const useGallery = () => {
  const context = React.useContext(GalleryContext);

  if (!context) {
    throw new Error('Components should be rendered inside the GalleryContext.Provider component');
  }

  return context;
};
