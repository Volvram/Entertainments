import { SectionType } from '@/Layers/Entities/Section/UI/SectionItem/Types.ts';

export const navMenuSections: SectionType[] = [
  {
    id: 'main',
    name: 'Главная',
    href: '/',
  },
  {
    id: 'ip',
    name: 'IP',
    href: '/ip',
  },
  {
    id: 'random-jokes',
    name: 'Рандомные шутки',
    href: '/random-jokes',
  },
  {
    id: 'cards',
    name: 'Карточные игры',
    href: '/cards',
  },
];
