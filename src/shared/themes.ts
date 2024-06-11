import { ThemeType } from '@/models/ThemeType.ts';

type ThemesType = {
  dark: ThemeType;
  light: ThemeType;
};

export const themes: ThemesType = {
  dark: 'dark',
  light: 'light',
};
