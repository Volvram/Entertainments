import React, { useEffect, useRef } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';

import { ImgButton } from '@/entities/ImgButton';
import {
  useLazyDrawCardsQuery,
  useLazyReshuffleCardsQuery,
  useLazyReturnCardsQuery,
  useRequestDeckQuery,
} from '@/shared/api/CardsService.ts';
import { isFetchBaseQueryErrorType } from '@/shared/lib/utils/isFetchBaseQueryErrorType.ts';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

export const BlackJackGame: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: deck } = useRequestDeckQuery(id ?? '');
  const [drawCards, drawnCards] = useLazyDrawCardsQuery();
  const [reshuffleCards, reshuffled] = useLazyReshuffleCardsQuery();
  const [returnCards, returned] = useLazyReturnCardsQuery();

  const cardRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (drawnCards.isError) {
      if (isFetchBaseQueryErrorType(drawnCards.error)) {
        alert(`Ошибка: ${drawnCards.error.status}. Что-то пошло не так, попробуйте позже.`);
      } else {
        alert(drawnCards.error);
      }
    }
  }, [drawnCards]);

  useEffect(() => {
    if (returned.isError) {
      if (isFetchBaseQueryErrorType(returned.error)) {
        alert(`Ошибка: ${returned.error.status}. Что-то пошло не так, попробуйте позже.`);
      } else {
        alert(returned.error);
      }
    }
  }, [returned]);

  useEffect(() => {
    if (reshuffled.isError) {
      if (isFetchBaseQueryErrorType(reshuffled.error)) {
        alert(`Ошибка: ${reshuffled.error.status}. Что-то пошло не так, попробуйте позже.`);
      } else {
        alert(reshuffled.error);
      }
    }
  }, [reshuffled]);

  const handleDrawCards = () => {
    if (id) {
      drawCards({ deckId: id });
    }
  };

  const handleReturnCards = () => {
    if (id) {
      returnCards({ deckId: id });
    }
  };

  const handleReshuffleCards = () => {
    if (id) {
      reshuffleCards({ deckId: id });
    }
  };

  const receiveCard = () => {
    cardRef.current?.animate(
      [
        {
          transform: 'translate(-300%, -300%)',
        },
        {
          transform: 'translate(0, 0)',
        },
      ],
      {
        duration: 500,
        fill: 'forwards',
      }
    );
  };

  return (
    <div className={styles.blackJackGame}>
      <div className={styles.blackJackGame_background} />
      <div className={styles.blackJackGame_root}>
        <ImgButton
          icon={<ArrowBackIosNewIcon />}
          onClick={() => {
            navigate(-1);
          }}
          className={styles.blackJackGame_root_back}
        />
        Блэк-Джек Игра #{deck ? deck.deck_id : null}
        <div className={styles.blackJackGame_root_block}>
          <Button onClick={handleDrawCards}>Потянуть карту</Button>

          <div className={styles.blackJackGame_root_block_cards}>
            {drawnCards.data && (
              <img
                ref={cardRef}
                src={drawnCards.data.cards[0].image}
                onLoad={receiveCard}
                className={styles.blackJackGame_root_block_cards_img}
                alt={drawnCards.data.cards[0].code}
              />
            )}
          </div>

          <Button onClick={handleReturnCards}>Вернуть карты в колоду</Button>
          <Button onClick={handleReshuffleCards}>Перемешать колоду</Button>
        </div>
      </div>
    </div>
  );
};
