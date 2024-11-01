import React from 'react';

export type TButton = React.PropsWithChildren<{
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
