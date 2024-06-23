import React from 'react';

import { SectionType } from '@/entities/Section/types/SectionType.ts';
import { BlackJackGame, BlackJackMenu } from '@/pages/BlackJack';

export type CardGameType<Nested = any> = SectionType & {
  element?: React.FC;
  nestedPages?: Nested[];
};
export const cardGames: CardGameType<CardGameType>[] = [
  {
    id: 'black-jack',
    name: 'Блэк-Джек',
    image: 'https://stktara.ru/km/zamezkkxem/img523844.jpg_',
    href: '/black-jack',
    nestedPages: [
      {
        id: 'black-jack-menu',
        name: 'Меню',
        href: '/menu',
        element: BlackJackMenu,
      },
      {
        id: 'black-jack-game',
        name: 'Игра',
        href: '/game/:id',
        element: BlackJackGame,
      },
    ],
  },
];
