import React from 'react';

import { SectionType } from '@/entities/Section/types.ts';
import { BlackJack } from '@/pages/BlackJack';

export type CardGameType<Nested = never> = SectionType & {
  element: React.FC;
  nestedPages?: Nested[];
};
export const cardGames: CardGameType[] = [
  {
    id: 'black-jack',
    name: 'Блэк-Джек',
    image: 'https://stktara.ru/km/zamezkkxem/img523844.jpg_',
    href: '/black-jack',
    element: BlackJack,
  },
];
