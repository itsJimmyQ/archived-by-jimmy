import * as React from 'react';

import { ViewportContainer } from 'common/general';

import { AboutViewMobile } from './AboutViewMobile';

export const AboutView = ({ isOpened, onClose }: AboutViewProps) => {
  return (
    <>
      <ViewportContainer.Mobile>
        <AboutViewMobile {...{ isOpened, onClose }} />
      </ViewportContainer.Mobile>
    </>
  );
};

type AboutViewProps = {
  isOpened: boolean;
  onClose: () => void;
};
