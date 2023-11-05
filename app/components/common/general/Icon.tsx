'use client';

import clsx from 'clsx';

export const Icon = ({
  icon: IconComponent,
  color = 'grass',
  size = 'md',
  className,
  onClick,
}: IconProps) => {
  if (onClick)
    return (
      <button {...{ className, onClick }}>
        <IconComponent
          className={clsx(
            {
              'w-6 h-6': size === 'md',
            },
            {
              'fill-grass-300': color === 'grass',
              'fill-ivory-300': color === 'ivory',
            },
          )}
        />
      </button>
    );

  return (
    <IconComponent
      className={clsx(
        {
          'w-6 h-6': size === 'md',
        },
        {
          'fill-grass-300': color === 'grass',
          'fill-ivory-300': color === 'ivory',
        },
        className,
      )}
    />
  );
};

type IconProps = {
  icon: any;
  color?: IconColors;
  size?: 'md';
  className?: string;
  onClick?: () => void;
};

type IconColors = 'grass' | 'ivory';
