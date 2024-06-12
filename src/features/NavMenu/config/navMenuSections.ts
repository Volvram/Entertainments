export type NavMenuSectionType = {
  id: string;
  title: string;
  href: string;
};
export const navMenuSections: NavMenuSectionType[] = [
  {
    id: 'main',
    title: 'Главная',
    href: '/',
  },
  {
    id: 'random-jokes',
    title: 'Рандомные шутки',
    href: '/random-jokes',
  },
];
