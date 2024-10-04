import React from 'react';

import { SectionsList } from '@/Layers/Entities/Section/UI/SectionsList/SectionsList.tsx';

import { NAV_MENU_SECTIONS } from '../lib/consts/navMenuSections.ts';

type NavMenuProps = {
  onChange?: () => void;
};
export const NavMenu: React.FC<NavMenuProps> = ({ onChange }) => {
  return <SectionsList sections={NAV_MENU_SECTIONS} onSectionClick={onChange} />;
};
