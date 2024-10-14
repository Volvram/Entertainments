import React, { useEffect, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';

import { PlayingCard } from '@/Layers/Entities/Cards';
import { ImgButton } from '@/Layers/Entities/ImgButton';
import {
  useLazyDrawCardsQuery,
  useLazyReshuffleCardsQuery,
  useRequestDeckQuery,
} from '@/Layers/Shared/api/cards/CardsService.ts';
import { TCard } from '@/Layers/Shared/api/cards/Types.ts';
import { useLazyRunBlackJackNeuralNetworkQuery } from '@/Layers/Shared/api/neural/ServerService.ts';
import { isFetchBaseQueryErrorTypeGuard } from '@/Layers/Shared/lib/TypeGuards.ts';
import { Button } from '@/Layers/Shared/UI/Button';

import styles from './styles.module.scss';
import { EWhoseMove } from './Types.ts';
import { getCardsScore } from '../../lib/helpers/getCardsScore.ts';

export const BlackJackGame: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: deck } = useRequestDeckQuery(id ?? '');
  const [drawCards, drawCardsResponse] = useLazyDrawCardsQuery();
  const [reshuffleCards] = useLazyReshuffleCardsQuery();
  const [runNeuralNetwork] = useLazyRunBlackJackNeuralNetworkQuery();

  const [botCards, setBotCards] = useState<TCard[]>([]);
  const [secondBotCardClosed, setSecondBotCardClosed] = useState(true);
  const [userCards, setUserCards] = useState<TCard[]>([]);

  // Возвращаем карты в колоду и перемешиваем при новой игре
  useEffect(() => {
    startGame();

    return handleReshuffleCards;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

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

        window.location.reload();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondBotCardClosed]);

  const startGame = () => {
    handleReshuffleCards();

    handleDrawCards(2, EWhoseMove.bot);

    setTimeout(() => {
      handleDrawCards(2, EWhoseMove.user);
    }, 1000);
  };

  const handleDrawCards = (count: number = 1, player?: EWhoseMove) => {
    if (id) {
      drawCards({ deckId: id, count })
        .unwrap()
        .then((data) => {
          player == EWhoseMove.bot
            ? setBotCards([...botCards, ...data.cards])
            : setUserCards([...userCards, ...data.cards]);
        })
        .catch((error) => {
          if (isFetchBaseQueryErrorTypeGuard(error)) {
            alert(`Ошибка: ${error.status}. Что-то пошло не так, попробуйте позже.`);
          } else {
            alert(error);
          }
        });
    }
  };

  const handleReshuffleCards = () => {
    if (id) {
      setSecondBotCardClosed(true);
      reshuffleCards({ deckId: id })
        .unwrap()
        .catch((error) => {
          if (isFetchBaseQueryErrorTypeGuard(error)) {
            alert(`Ошибка: ${error.status}. Что-то пошло не так, попробуйте позже.`);
          } else {
            alert(error);
          }
        });
      setUserCards([]);
      setBotCards([]);
    }
  };

  const handleCountResult = () => {
    if (botCards.length) {
      const botCardsParams = {
        sum: getCardsScore(userCards),
        openedCard: botCards[0].value,
      };

      runNeuralNetwork(botCardsParams)
        .unwrap()
        .then((data) => {
          // Элемент случайности действий нейронной сети
          const chance = Math.random();

          // Является ли взятие новой карты менее вероятным событием
          const shouldTake = data.take < data.stay;

          if (shouldTake) {
            // Если решается вопрос взятия карты и шанс выпал в пределах взятия новой карты
            if (chance < Math.min(data.take, data.stay)) {
              handleDrawCards();
            }
          } else {
            // Если решается вопрос остановки и шанс НЕ выпал в пределах остановки
            if (!(chance < Math.min(data.take, data.stay))) {
              handleDrawCards();
            }
          }
        })
        .finally(() => {
          setSecondBotCardClosed(false);
        });
    }
  };

  const receiveCardAnimation = (ref: React.RefObject<HTMLImageElement | null>) => {
    ref.current?.animate(
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
                        receiveCardAnimation={receiveCardAnimation}
                        flipping={false}
                      />
                    );
                  }

                  return (
                    <PlayingCard
                      key={botCard.code}
                      card={botCard}
                      flipping={false}
                      receiveCardAnimation={receiveCardAnimation}
                    />
                  );
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
                      receiveCardAnimation={receiveCardAnimation}
                      className={styles.blackJackGame_root_table_user_cards_img}
                    />
                  );
                })}
            </div>

            <div className={styles.blackJackGame_root_table_user_score}>
              Ваш счет: <span>{getCardsScore(userCards)}</span>
            </div>

            <div className={styles.blackJackGame_root_table_user_actions}>
              <Button
                onClick={() => {
                  handleDrawCards();
                }}
                className={styles.blackJackGame_root_table_user_actions_button}
                disabled={getCardsScore(userCards) >= 21 || drawCardsResponse.isLoading}
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
