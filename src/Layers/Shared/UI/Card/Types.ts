import { PropsWithChildren } from 'react';

export type TCard = PropsWithChildren<{
  title?: string;
  image?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
}>;