import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { SwipeableDrawer } from '@mui/material';

export type CustomDrawerRef = {
  open: () => void;
  close: () => void;
};

type DrawerProps = React.PropsWithChildren<{
  onOpen?: () => void;
  onClose?: () => void;
}>;

const Drawer = forwardRef<CustomDrawerRef, DrawerProps>(function Drawer({ onOpen, onClose, children }, ref) {
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
    onOpen?.();
  };
  const handleClose = () => {
    onClose?.();
  };

  return (
    <SwipeableDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      {children}
    </SwipeableDrawer>
  );
});

export default Drawer;
