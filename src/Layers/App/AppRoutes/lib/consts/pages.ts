import { CardGames } from '@/Layers/Pages/CardGames';
import { CARD_GAMES } from '@/Layers/Pages/CardGames/lib/consts/cardGames.ts';
import { Ip } from '@/Layers/Pages/Ip';
import { Main } from '@/Layers/Pages/Main';
import { RandomJokes } from '@/Layers/Pages/RandomJokes';

import { TPage } from '../../UI/Types.ts';

export const PAGES: TPage[] = [
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
    element: CardGames,
    nestedPages: [...CARD_GAMES],
  },
];
