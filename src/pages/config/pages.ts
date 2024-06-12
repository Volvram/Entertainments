import React from 'react';

import { NavMenuSectionType } from '@/features/NavMenu/config/navMenuSections.ts';
import { Main } from '@/pages/Main';
import { RandomJokes } from '@/pages/RandomJokes';

type PageType = NavMenuSectionType & {
  element: React.FC;
};
export const pages: PageType[] = [
  {
    id: 'main',
    title: 'Главная',
    href: '/',
    element: Main,
  },
  {
    id: 'random-jokes',
    title: 'Рандомные шутки',
    href: '/random-jokes',
    element: RandomJokes,
  },
];
