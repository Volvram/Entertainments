import React from 'react';

import { TCard } from '@/Layers/Shared/api';

export type CustomPlayingCardRefType = {
  flip: () => void;
};

export type TPlayingCard = {
  card: TCard;
  flipping?: boolean;
  isFlipped?: boolean;
  onClick?: (ref: React.MutableRefObject<HTMLImageElement | null>) => void;
  receiveCardAnimation?: (ref: React.RefObject<HTMLImageElement | null>) => void;
  className?: string;
};
