import React, { useEffect, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';

import { ImgButton } from '@/entities/ImgButton';
import { PlayingCard } from '@/entities/PlayingCard';
import { getCardsScore } from '@/pages/BlackJack/lib/utils/getCardsScore.ts';
import {
  useLazyDrawCardsQuery,
  useLazyReshuffleCardsQuery,
  useRequestDeckQuery,
} from '@/shared/api/CardsService.ts';
import { isFetchBaseQueryErrorType } from '@/shared/lib/utils/isFetchBaseQueryErrorType.ts';
import { CardType } from '@/shared/types/CardType.ts';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

export const BlackJackGame: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: deck } = useRequestDeckQuery(id ?? '');
  const [drawCards, drawnCards] = useLazyDrawCardsQuery();
  const [reshuffleCards, reshuffled] = useLazyReshuffleCardsQuery();

  const [move, setMove] = useState<'bot' | 'user'>('bot');

  const [botCards, setBotCards] = useState<CardType[]>([]);
  const [secondBotCardClosed, setSecondBotCardClosed] = useState(true);
  const [userCards, setUserCards] = useState<CardType[]>([]);

  useEffect(() => {
    if (deck) {
      handleDrawCards(2);
    }

    return handleReshuffleCards;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  // При переходе хода на бота он берет 2 карты
  useEffect(() => {
    handleDrawCards(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move]);

  // Передаем ход игроку спустя интервал времени
  useEffect(() => {
    setTimeout(() => {
      setMove('user');
    }, 1000);
  }, [botCards]);

  // Обработка подсчета результатов игры при открытии карты бота
  useEffect(() => {
    if (!secondBotCardClosed) {
      setTimeout(() => {
        if (getCardsScore(userCards) <= 21 && getCardsScore(botCards) > 21) {
          alert('Вы победили!');
        } else if (getCardsScore(userCards) <= 21 && getCardsScore(botCards) <= 21) {
          if (getCardsScore(userCards) > getCardsScore(botCards)) {
            alert('Вы победили!');
          } else if (getCardsScore(userCards) == getCardsScore(botCards)) {
            alert('Ничья');
          } else {
            alert('Вы проиграли');
          }
        } else if (getCardsScore(userCards) > 21 && getCardsScore(botCards) <= 21) {
          alert('Вы проиграли');
        } else if (getCardsScore(userCards) > 21 && getCardsScore(botCards) > 21) {
          if (getCardsScore(userCards) > getCardsScore(botCards)) {
            alert('Вы проиграли');
          } else if (getCardsScore(userCards) == getCardsScore(botCards)) {
            alert('Ничья');
          } else {
            alert('Вы победили!');
          }
        }

        handleReshuffleCards();
        setMove('bot');
      }, 2000);
    }
  }, [secondBotCardClosed]);

  // Обработка ошибок при запросе карты
  useEffect(() => {
    if (drawnCards.isError) {
      if (isFetchBaseQueryErrorType(drawnCards.error)) {
        alert(`Ошибка: ${drawnCards.error.status}. Что-то пошло не так, попробуйте позже.`);
      } else {
        alert(drawnCards.error);
      }
    }
  }, [drawnCards]);

  // Добавлять карту пользователю, когда была запрошена новая
  useEffect(() => {
    if (!drawnCards.isLoading && drawnCards.data) {
      move == 'bot'
        ? setBotCards([...botCards, ...drawnCards.data.cards])
        : setUserCards([...userCards, ...drawnCards.data.cards]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawnCards.data]);

  // Обработка ошибок при перемешивании карт
  useEffect(() => {
    if (reshuffled.isError) {
      if (isFetchBaseQueryErrorType(reshuffled.error)) {
        alert(`Ошибка: ${reshuffled.error.status}. Что-то пошло не так, попробуйте позже.`);
      } else {
        alert(reshuffled.error);
      }
    }
  }, [reshuffled]);

  const handleDrawCards = (count?: number) => {
    if (id) {
      drawCards({ deckId: id, count });
    }
  };

  const handleReshuffleCards = () => {
    if (id) {
      setSecondBotCardClosed(true);
      reshuffleCards({ deckId: id });
      setUserCards([]);
      setBotCards([]);
    }
  };

  const handleCountResult = () => {
    setSecondBotCardClosed(false);
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
        <div className={styles.blackJackGame_root_table}>
          <div className={styles.blackJackGame_root_table_bot}>
            <div className={styles.blackJackGame_root_table_bot_score}>
              Счет бота:{' '}
              {secondBotCardClosed
                ? `${getCardsScore(botCards.slice(0, 1))} + ?`
                : `${getCardsScore(botCards)}`}
            </div>

            <div className={styles.blackJackGame_root_table_bot_cards}>
              {Boolean(botCards.length) &&
                botCards.map((botCard, index) => {
                  if (index == 1) {
                    return (
                      <PlayingCard
                        key={botCard.code}
                        card={botCard}
                        isFlipped={secondBotCardClosed}
                        flipping={false}
                      />
                    );
                  }

                  return <PlayingCard key={botCard.code} card={botCard} flipping={false} />;
                })}
            </div>
          </div>

          <div className={styles.blackJackGame_root_table_user}>
            <div className={styles.blackJackGame_root_table_user_cards}>
              {Boolean(userCards.length) &&
                userCards.map((userCard) => {
                  return (
                    <PlayingCard
                      key={userCard.code}
                      card={userCard}
                      flipping={false}
                      className={styles.blackJackGame_root_table_user_cards_img}
                    />
                  );
                })}
            </div>

            <div className={styles.blackJackGame_root_table_user_score}>
              Ваш счет: <span style={{ color: 'yellow' }}>{getCardsScore(userCards)}</span>
            </div>

            <div className={styles.blackJackGame_root_table_user_actions}>
              <Button
                onClick={() => {
                  handleDrawCards();
                }}
                className={styles.blackJackGame_root_table_user_actions_button}
                disabled={getCardsScore(userCards) >= 21 || move != 'user'}
              >
                Потянуть карту
              </Button>
              <Button
                onClick={handleCountResult}
                className={styles.blackJackGame_root_table_user_actions_button}
              >
                Остановиться
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
