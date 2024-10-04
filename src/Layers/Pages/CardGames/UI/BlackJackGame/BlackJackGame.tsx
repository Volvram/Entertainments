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
import { isFetchBaseQueryErrorType } from '@/Layers/Shared/lib/helpers/isFetchBaseQueryErrorType.ts';
import { Button } from '@/Layers/Shared/UI/Button';

import styles from './styles.module.scss';
import { EWhoseMove, TWhoseMove } from './Types.ts';
import { getCardsScore } from '../../lib/helpers/getCardsScore.ts';

export const BlackJackGame: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: deck } = useRequestDeckQuery(id ?? '');
  const [drawCards, drawnCards] = useLazyDrawCardsQuery();
  const [reshuffleCards, reshuffled] = useLazyReshuffleCardsQuery();
  const [runNeuralNetwork, neuralNetwork] = useLazyRunBlackJackNeuralNetworkQuery();

  const [move, setMove] = useState<TWhoseMove>('bot');

  const [botCards, setBotCards] = useState<TCard[]>([]);
  const [secondBotCardClosed, setSecondBotCardClosed] = useState(true);
  const [userCards, setUserCards] = useState<TCard[]>([]);

  // Возвращаем карты в колоду и перемешиваем при новой игре
  useEffect(() => {
    // Бот тянет 2 начальные карты
    handleDrawCards(2);
    // Передаем ход игроку спустя интервал времени
    setTimeout(() => {
      setMove(EWhoseMove.user);
    }, 1000);

    return handleReshuffleCards;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  // При переходе хода на игрока берутся 2 начальные карты, при втором переходе на бота запускается нейронная сеть
  useEffect(() => {
    if (move === EWhoseMove.user) {
      handleDrawCards(2);
    } else {
      if (botCards.length) {
        const botCardsParams = {
          sum: getCardsScore(userCards),
          openedCard: botCards[0].value,
        };

        runNeuralNetwork(botCardsParams);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move]);

  // Добавлять запрошенные новые карты тому, чей ход
  useEffect(() => {
    if (!drawnCards.isLoading && drawnCards.data) {
      move == EWhoseMove.bot
        ? setBotCards([...botCards, ...drawnCards.data.cards])
        : setUserCards([...userCards, ...drawnCards.data.cards]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawnCards.data]);

  useEffect(() => {
    if (neuralNetwork.data) {
      // Элемент случайности действий нейронной сети
      const chance = Math.random();

      // Является ли взятие новой карты менее вероятным событием
      const shouldTake = neuralNetwork.data.take < neuralNetwork.data.stay;

      if (shouldTake) {
        // Если решается вопрос взятия карты и шанс выпал в пределах взятия новой карты
        if (chance < Math.min(neuralNetwork.data.take, neuralNetwork.data.stay)) {
          handleDrawCards();
        }
      } else {
        // Если решается вопрос остановки и шанс НЕ выпал в пределах остановки
        if (!(chance < Math.min(neuralNetwork.data.take, neuralNetwork.data.stay))) {
          handleDrawCards();
        }
      }

      // Через некоторое время запустить проверку результата
      setTimeout(() => {
        setSecondBotCardClosed(false);
      }, 1000);
    }

    // Обработка ошибки получения данных нейронной сети
    if (neuralNetwork.isError) {
      setSecondBotCardClosed(false);
    }
  }, [neuralNetwork]);

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
    setMove(EWhoseMove.bot);
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
              Ваш счет: <span>{getCardsScore(userCards)}</span>
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
