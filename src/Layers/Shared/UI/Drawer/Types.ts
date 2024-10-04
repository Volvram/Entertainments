import React from 'react';

export type CustomDrawerRefType = {
  open: () => void;
  close: () => void;
};

export type TDrawer = React.PropsWithChildren<{
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}>;
