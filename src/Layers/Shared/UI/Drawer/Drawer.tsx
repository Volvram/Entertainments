import { forwardRef, useImperativeHandle, useState } from 'react';

import './MUI.scss';

import { SwipeableDrawer } from '@mui/material';
import cn from 'classnames';

import { WithCross } from '@/Layers/Shared/UI/WithCross';

import styles from './styles.module.scss';
import { CustomDrawerRefType, TDrawer } from './Types.ts';

export const Drawer = forwardRef<CustomDrawerRefType, TDrawer>(function Drawer(
  { onOpen, onClose, className, children },
  ref
) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }),
    []
  );

  const handleOpen = () => {
    setOpen(true);
    onOpen?.();
  };
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <SwipeableDrawer
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      className={cn(styles.root, className)}
    >
      <WithCross onClose={handleClose}>{children}</WithCross>
    </SwipeableDrawer>
  );
});
