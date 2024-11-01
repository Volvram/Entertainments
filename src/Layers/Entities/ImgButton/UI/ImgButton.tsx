import React from 'react';

import IconButton from '@mui/material/IconButton';
import cn from 'classnames';

import { Button } from '@/Layers/Shared/UI/Button';

import styles from './styles.module.scss';
import { TImgButton } from './Types';

export const ImgButton: React.FC<TImgButton> = ({ icon, onClick, name, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      {typeof icon === 'string' ? (
        <Button className={styles.root_button} onClick={onClick}>
          <img src={icon} className={styles.root_icon} alt={name} />
        </Button>
      ) : (
        <IconButton
          id='fade-button'
          aria-haspopup='true'
          color='inherit'
          className={styles.root_button}
          onClick={onClick}
        >
          {icon}
        </IconButton>
      )}
    </div>
  );
};
