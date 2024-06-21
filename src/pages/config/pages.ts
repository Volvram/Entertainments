import React from 'react';

import { SectionType } from '@/entities/Section/types.ts';
import { Cards } from '@/pages/Cards';
import { cardGames } from '@/pages/config/cardGames.ts';
import { Ip } from '@/pages/Ip';
import { Main } from '@/pages/Main';
import { RandomJokes } from '@/pages/RandomJokes';

type PageType<Nested = never> = SectionType & {
  element: React.FC;
  nestedPages?: Nested[];
};
export const pages: PageType<PageType>[] = [
  {
    id: 'main',
    name: 'Главная',
    href: '/',
    element: Main,
  },
  {
    id: 'ip',
    name: 'IP',
    href: '/ip',
    element: Ip,
  },
  {
    id: 'random-jokes',
    name: 'Рандомные шутки',
    href: '/random-jokes',
    element: RandomJokes,
  },
  {
    id: 'cards',
    name: 'Карточные игры',
    href: '/cards',
    element: Cards,
    nestedPages: [...cardGames],
  },
];
