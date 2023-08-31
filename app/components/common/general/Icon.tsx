import clsx from 'clsx';

const SIZES = {
  md: ['w-6 h-6'],
};

const COLORS: Record<IconColors, string[]> = {
  grass: ['fill-grass-300'],
  ivory: ['fill-ivory-100'],
};

export const Icon = ({ icon: IconComponent, color = 'grass', size = 'md' }: IconProps) => {
  return <IconComponent className={clsx(SIZES[size], COLORS[color])} />;
};

type IconProps = {
  icon: any;
  color?: IconColors;
  size?: 'md';
};

type IconColors = 'grass' | 'ivory';
