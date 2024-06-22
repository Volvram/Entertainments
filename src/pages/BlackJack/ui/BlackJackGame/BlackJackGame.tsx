import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

import { ImgButton } from '@/entities/ImgButton';

import styles from './styles.module.scss';

export const BlackJackGame: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.blackJackGame}>
      <ImgButton
        icon={<ArrowBackIosNewIcon />}
        onClick={() => {
          navigate(-1);
        }}
        className={styles.blackJackGame_back}
      />
      Блэк-Джек Игра
    </div>
  );
};
