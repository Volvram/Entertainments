import React from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { ImgButton } from '@/Layers/Entities/ImgButton';

import styles from './styles.module.scss';
import { TWithCross } from './Types';

export const WithCross: React.FC<TWithCross> = ({ onClose, children }) => {
  return (
    <div className={styles.withCross}>
      <ImgButton icon={<CloseIcon />} onClick={onClose} className={styles.withCross_cross} />
      {children}
    </div>
  );
};
