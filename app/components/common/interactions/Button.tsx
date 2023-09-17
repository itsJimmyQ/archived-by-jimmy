import * as React from 'react';

import clsx from 'clsx';

const STYLES = {
  default: ['text-grass-300', 'cursor-pointer'],
  active: ['bg-grass-300', 'text-ivory-100', 'cursor-default'],
};

const STYLES_HOVER = {
  default: ['hover:bg-grass-300', 'hover:text-ivory-100'],
  active: [],
};

export const Button = ({ children, isActive, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-grass-100 hover:bg-grass-200 rounded-full px-4 py-2 transition-all',
        isActive ? STYLES['active'] : STYLES['default'],
        isActive ? STYLES_HOVER['active'] : STYLES_HOVER['default'],
        className,
      )}
      type="button"
      {...{ ...props }}
    >
      <p className="text-2xl text-grass-300">{children}</p>
    </button>
  );
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};
