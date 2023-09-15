import * as React from 'react';

import { CursorContext } from 'contexts';

export const useCursor = () => {
  const context = React.useContext(CursorContext);

  if (!context) {
    throw new Error('Components should be rendered inside the CursorProvider component');
  }

  return context;
};
