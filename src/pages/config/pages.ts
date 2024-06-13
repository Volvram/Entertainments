import React from 'react';

import { SectionType } from '@/entities/Section/types.ts';
import { Main } from '@/pages/Main';
import { RandomJokes } from '@/pages/RandomJokes';

type PageType = SectionType & {
  element: React.FC;
};
export const pages: PageType[] = [
  {
    id: 'main',
    name: 'Главная',
    href: '/',
    element: Main,
  },
  {
    id: 'random-jokes',
    name: 'Рандомные шутки',
    href: '/random-jokes',
    element: RandomJokes,
  },
];
