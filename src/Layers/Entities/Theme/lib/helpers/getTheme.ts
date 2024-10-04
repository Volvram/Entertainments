import { ETheme } from '../../UI/ThemeSwitch/Types';

export const getTheme = () => {
  const theme = window?.localStorage.getItem('theme') as ETheme;

  if (Object.values(ETheme).includes(theme)) {
    return theme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) {
    return ETheme.light;
  }

  return ETheme.dark;
};
