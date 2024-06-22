import { themes } from '@/shared/config/themes.ts';

export const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;

  if (theme == 'light' || theme == 'dark') {
    if (Object.values(themes).includes(theme)) return theme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return themes.light;

  return themes.dark;
};
