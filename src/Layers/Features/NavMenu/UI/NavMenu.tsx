import React from 'react';

import SectionsList from '@/entities/SectionsList/ui/SectionsList.tsx';
import { navMenuSections } from '@/features/NavMenu/config/navMenuSections.ts';

type NavMenuProps = {
  onChange?: () => void;
};
const NavMenu: React.FC<NavMenuProps> = ({ onChange }) => {
  return <SectionsList sections={navMenuSections} onSectionClick={onChange} />;
};

export default NavMenu;
