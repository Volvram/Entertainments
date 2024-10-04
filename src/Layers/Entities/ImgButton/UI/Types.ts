import { ReactNode } from 'react';

export type TImgButton = {
  icon: string | ReactNode;
  onClick: () => void;
  name?: string;
  className?: string;
};
