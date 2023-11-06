'use client';

import clsx from 'clsx';

export const Icon = ({
  icon: IconComponent,
  size = 'md',
  className,
  title,
  onClick,
}: IconProps) => {
  if (onClick)
    return (
      <button {...{ className, title, onClick }}>
        <IconComponent
          className={clsx(
            {
              'w-6 h-6': size === 'md',
            },
            'fill-ivory-300',
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
        'fill-ivory-300',
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
} & (
  | {
      title: string;
      onClick: () => void;
    }
  | {
      title?: string;
      onClick?: never;
    }
);

type IconColors = 'grass' | 'ivory';
