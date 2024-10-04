import React from 'react';

import { SectionType } from '@/Layers/Entities/Section/types/SectionType.ts';
import { BlackJackGame, BlackJackMenu } from '@/Layers/Pages/BlackJack';

export type CardGameType<Nested = any> = SectionType & {
  element?: React.FC;
  nestedPages?: Nested[];
};
export const cardGames: CardGameType<CardGameType>[] = [
  {
    id: 'black-jack',
    name: 'Блэк-Джек',
    image: 'https://i.pinimg.com/736x/52/b5/e2/52b5e20a6313de8a6b8e9e4af22a63d5.jpg',
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
