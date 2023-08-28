import clsx from 'clsx';
import * as React from 'react';

const STYLES = {
  default: ['border-solid', 'border-[1px]', 'border-grass-300', 'text-grass-300', 'cursor-pointer'],
  active: ['bg-grass-300', 'text-ivory-100', 'cursor-default'],
};

const STYLES_HOVER = {
  default: ['hover:bg-grass-300', 'hover:text-ivory-100'],
  active: [],
};

export const Button = ({ children, isActive, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-full px-4 py-2 transition-all',
        isActive ? STYLES['active'] : STYLES['default'],
        isActive ? STYLES_HOVER['active'] : STYLES_HOVER['default'],
      )}
      {...{ ...props }}
    >
      <p className="text-2xl">{children}</p>
    </button>
  );
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};
