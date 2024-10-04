import React from 'react';

import { ThemeSwitch } from '@/Layers/Entities/Theme';
import { NavMenu } from '@/Layers/Features/NavMenu';
import { TNavDrawer } from '@/Layers/Widgets/NavDrawer/UI/Types.ts';

import styles from './styles.module.scss';
import { Drawer } from '@/Layers/Shared/UI/Drawer';

export const NavDrawer: React.FC<TNavDrawer> = ({ forwardRef, title, className }) => {
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
