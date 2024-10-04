import { ReactNode } from 'react';

export type TFlippingCard = {
  frontComponent: ReactNode;
  backComponent: ReactNode;
  isFlipped?: boolean;
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  flipDirection?: 'vertical' | 'horizontal';
  className?: string;
};
