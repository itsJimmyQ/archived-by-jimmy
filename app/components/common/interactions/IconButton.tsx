import * as React from 'react';
import clsx from 'clsx';

import { Icon } from 'common/general';

const BACKGROUND = {
  default: ['bg-ivory-100'],
  active: ['bg-grass-300'],
};

const FLEX = {
  fullWidth: ['flex', 'justify-center', 'flex-1'],
  auto: ['flex-initial'],
};

export const IconButton = ({ icon, isActive, isFullWidth, ...props }: IconButtonProps) => {
  return (
    <button
      className={clsx(
        'border-grass-300 border-solid border-[1px] rounded-full p-4 transition-all',
        isActive ? BACKGROUND['active'] : BACKGROUND['default'],
        isFullWidth ? FLEX['fullWidth'] : FLEX['auto'],
      )}
      type="button"
      {...{ ...props }}
    >
      <Icon {...{ icon }} color={isActive ? 'ivory' : 'grass'} />
    </button>
  );
};

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: any;
  isFullWidth?: boolean;
  isActive?: boolean;
};
