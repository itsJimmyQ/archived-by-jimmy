import clsx from 'clsx';

export const Icon = ({ icon: IconComponent, color = 'grass', size = 'md' }: IconProps) => {
  return (
    <IconComponent
      className={clsx(
        {
          'w-6 h-6': size === 'md',
        },
        {
          'fill-grass-300': color === 'grass',
          'fill-ivory-100': color === 'ivory',
        },
      )}
    />
  );
};

type IconProps = {
  icon: any;
  color?: IconColors;
  size?: 'md';
};

type IconColors = 'grass' | 'ivory';
