import React from 'react';

import SectionsList from '@/entities/SectionsList/ui/SectionsList.tsx';
import { navMenuSections } from '@/features/NavMenu/config/navMenuSections.ts';

const NavMenu: React.FC = () => {
  return <SectionsList sections={navMenuSections} />;
};

export default NavMenu;
