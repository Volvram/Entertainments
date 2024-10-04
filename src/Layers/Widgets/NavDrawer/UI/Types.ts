import { MutableRefObject } from 'react';

import { CustomDrawerRefType } from '@/Layers/Shared/UI/Drawer/Types.ts';

export type TNavDrawer = {
  forwardRef: MutableRefObject<CustomDrawerRefType | null>;
  title?: string;
  className?: string;
};
