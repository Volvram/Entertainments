import React, { ReactNode } from 'react';

import IconButton from '@mui/material/IconButton';
import cn from 'classnames';

import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

type ImgButtonProps = {
  icon: string | ReactNode;
  onClick: () => void;
  name?: string;
  className?: string;
};

const ImgButton: React.FC<ImgButtonProps> = ({ icon, onClick, name, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      {typeof icon == 'string' ? (
        <Button className={styles.root_button} onClick={onClick}>
          <img src={icon} className={styles.root_icon} alt={name} />
        </Button>
      ) : (
        <IconButton id='fade-button' aria-haspopup='true' color='inherit' onClick={onClick}>
          {icon}
        </IconButton>
      )}
    </div>
  );
};

export default ImgButton;
