import React from 'react';

export type TWithCross = React.PropsWithChildren<{
  onClose: () => void;
}>;
