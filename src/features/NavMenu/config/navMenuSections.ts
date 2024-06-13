import { SectionType } from '@/entities/Section/types.ts';

export const navMenuSections: SectionType[] = [
  {
    id: 'main',
    name: 'Главная',
    href: '/',
  },
  {
    id: 'random-jokes',
    name: 'Рандомные шутки',
    href: '/random-jokes',
  },
];
