import * as React from 'react';

import clsx from 'clsx';

export const Button = ({ children, isActive, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-grass-100 hover:bg-grass-200 rounded-full px-4 py-2 transition-all text-grass-300 cursor-pointer',
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
