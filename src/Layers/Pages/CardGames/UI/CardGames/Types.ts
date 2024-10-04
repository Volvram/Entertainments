import React from 'react';

import { TSection } from '@/Layers/Entities/Section/UI/SectionItem/Types.ts';

export type TCardGame<Nested = any> = TSection & {
  element?: React.FC;
  nestedPages?: Nested[];
};

type TGame = {
  id: string;
  name: string;
  deckIds: string[];
};

export type TCards = {
  games: Record<string, TGame>;
};
