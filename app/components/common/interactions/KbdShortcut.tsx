'use client';

import * as React from 'react';

import clsx from 'clsx';

export const KbdShortcut = ({ shortcutKey, label, isDisabled, onUse }: KbdShortcutProps) => {
  const kbdRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onUse]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== shortcutKey || isDisabled) return;

    onUse();
  };

  const kbdLabel = shortcutKey.toLowerCase().includes('key') ? shortcutKey.slice(3) : shortcutKey;

  return (
    <button
      className={clsx('flex items-center gap-4 border-none bg-transparent cursor-pointer group')}
      type="button"
      title={`Press ${kbdLabel.toUpperCase()} to ${label}`}
      onClick={onUse}
    >
      <span
        className={clsx(
          'text-sm text-ivory-300 px-4 py-2 rounded-[4px] border border-ivory-300',
          'group-hover:bg-ivory-200 transition-all ease-linear duration-200',
        )}
        ref={kbdRef}
      >
        {kbdLabel.toUpperCase()}
      </span>
      <label className="font-medium text-ivory-300 cursor-pointer">{label}</label>
    </button>
  );
};

type KbdShortcutProps = {
  shortcutKey: string;
  label: string;
  isDisabled?: boolean;
  onUse: () => void;
};
