import clsx from 'clsx';
import * as React from 'react';

export const Button = ({ children, isActive, className, ...props }: ButtonProps) => {
  let dynamicClassName = '';
  if (isActive) {
    dynamicClassName = 'bg-grass-300 text-ivory';
  } else {
    dynamicClassName = 'border-solid border-[1px] border-grass-300 text-grass-300';
  }

  return (
    <button
      className={clsx('rounded-full cursor-pointer px-4 py-2', dynamicClassName, className)}
      {...{ ...props }}
    >
      {children}
    </button>
  );
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};
