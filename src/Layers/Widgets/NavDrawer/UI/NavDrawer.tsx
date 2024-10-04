import React, { MutableRefObject } from 'react';

import NavMenu from '@/features/NavMenu/ui/NavMenu.tsx';
import { Drawer } from '@/shared/ui/Drawer';
import { CustomDrawerRefType } from '@/shared/ui/Drawer/types.ts';
import ThemeSwitch from '@/shared/ui/ThemeSwitch/ThemeSwitch.tsx';

import styles from './styles.module.scss';

type NavDrawerProps = {
  forwardRef: MutableRefObject<CustomDrawerRefType | null>;
  title?: string;
  className?: string;
};
const NavDrawer: React.FC<NavDrawerProps> = ({ forwardRef, title, className }) => {
  return (
    <Drawer ref={forwardRef} className={className}>
      <ThemeSwitch />
      {title && <h2 className={styles.root_h}>{title}</h2>}
      <NavMenu
        onChange={() => {
          forwardRef.current?.close();
        }}
      />
    </Drawer>
  );
};

export default NavDrawer;
