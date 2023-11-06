'use client';

import { ViewportContainer } from '..';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

export const Header = () => {
  return (
    <>
      <ViewportContainer.Desktop>
        <HeaderDesktop />
      </ViewportContainer.Desktop>

      <ViewportContainer.Mobile>
        <HeaderMobile />
      </ViewportContainer.Mobile>
    </>
  );
};
