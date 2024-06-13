import React from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { ImgButton } from '@/entities/ImgButton';

import styles from './styles.module.scss';

type WithCrossProps = React.PropsWithChildren<{
  onClose: () => void;
}>;

const WithCross: React.FC<WithCrossProps> = ({ onClose, children }) => {
  return (
    <div className={styles.root}>
      <ImgButton icon={<CloseIcon className={styles.root_cross} />} onClick={onClose} />
      {children}
    </div>
  );
};

export default WithCross;
