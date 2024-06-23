import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';

import { ImgButton } from '@/entities/ImgButton';
import { useRequestDeckQuery } from '@/shared/api/CardsService.ts';

import styles from './styles.module.scss';

export const BlackJackGame: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: deck } = useRequestDeckQuery(id ?? '');

  return (
    <div className={styles.blackJackGame}>
      <ImgButton
        icon={<ArrowBackIosNewIcon />}
        onClick={() => {
          navigate(-1);
        }}
        className={styles.blackJackGame_back}
      />
      Блэк-Джек Игра #{deck ? deck.deck_id : null}
    </div>
  );
};
