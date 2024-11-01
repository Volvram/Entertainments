import React, { useEffect, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Alert } from '@mui/material';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: deck } = useRequestDeckQuery(id ?? '');
  const [drawCards, drawCardsResponse] = useLazyDrawCardsQuery();
  const [reshuffleCards] = useLazyReshuffleCardsQuery();
  const [runNeuralNetwork] = useLazyRunBlackJackNeuralNetworkQuery();

  const [alertMessage, setAlertMessage] = useState<string | undefined>();
  const [botCards, setBotCards] = useState<TCard[]>([]);
  const [secondBotCardClosed, setSecondBotCardClosed] = useState<boolean>(true);
  const [userCards, setUserCards] = useState<TCard[]>([]);
  const [isShowNewGame, setIsShowNewGame] = useState<boolean>(false);

  const handleDrawCardsAsync = async (
    count: number = 1,
    player?: EWhoseMove,
    replace: boolean = false
  ) => {
    try {
      if (id) {
        const drawnCards = await drawCards({ deckId: id, count }).unwrap();

        if (replace) {
          player == EWhoseMove.bot ? setBotCards(drawnCards.cards) : setUserCards(drawnCards.cards);
          return;
        }

        player == EWhoseMove.bot
          ? setBotCards([...botCards, ...drawnCards.cards])
          : setUserCards([...userCards, ...drawnCards.cards]);
      }
    } catch (error) {
      if (isFetchBaseQueryErrorTypeGuard(error)) {
        alert(
          `${intl.messages['error']}: ${error.status}. ${intl.messages['somethingWentWrongTryLater']}.`
        );
      } else {
        alert(error);
      }
    }
  };

  const handleDrawCards = (count: number = 1, player?: EWhoseMove, replace: boolean = false) => {
    if (id) {
      drawCards({ deckId: id, count })
        .unwrap()
        .then((data) => {
          if (replace) {
            player == EWhoseMove.bot ? setBotCards(data.cards) : setUserCards(data.cards);
            return;
          }

          player == EWhoseMove.bot
            ? setBotCards([...botCards, ...data.cards])
            : setUserCards([...userCards, ...data.cards]);
        })
        .catch((error) => {
          if (isFetchBaseQueryErrorTypeGuard(error)) {
            alert(
              `${intl.messages['error']}: ${error.status}. ${intl.messages['somethingWentWrongTryLater']}.`
            );
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
            alert(
              `${intl.messages['error']}: ${error.status}. ${intl.messages['somethingWentWrongTryLater']}.`
            );
          } else {
            alert(error);
          }
        });
      setUserCards([]);
      setBotCards([]);
    }
  };

  const handleCountResult = () => {
    setAlertMessage(`${intl.messages['awaitingForBotMove']}...`);
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
              handleDrawCards(1, EWhoseMove.bot);
            }
          } else {
            // Если решается вопрос остановки и шанс НЕ выпал в пределах остановки
            if (!(chance < Math.min(data.take, data.stay))) {
              handleDrawCards(1, EWhoseMove.bot);
            }
          }
        })
        .catch(async () => {
          // Элемент случайности действий бота
          const chance = Math.random();

          if (chance > 0.5) {
            await handleDrawCardsAsync(1, EWhoseMove.bot);
          }
        })
        .finally(() => {
          setSecondBotCardClosed(false);
          setAlertMessage(undefined);
        });
    }
  };

  const startGame = () => {
    setIsShowNewGame(false);
    setAlertMessage(undefined);
    handleReshuffleCards();

    // Тянем начальные карты
    handleDrawCardsAsync(2, EWhoseMove.bot, true).then(() => {
      handleDrawCards(2, EWhoseMove.user, true);
    });
  };

  // Автоматический старт при заходе на страницу
  useEffect(() => {
    if (botCards.length === 0 && userCards.length === 0) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  // Обработка подсчета результатов игры при открытии карты бота
  useEffect(() => {
    if (!secondBotCardClosed) {
      if (getCardsScore(userCards) <= 21 && getCardsScore(botCards) > 21) {
        setAlertMessage(`${intl.messages['youWon']}!`);
      } else if (getCardsScore(userCards) <= 21 && getCardsScore(botCards) <= 21) {
        if (getCardsScore(userCards) > getCardsScore(botCards)) {
          setAlertMessage(`${intl.messages['youWon']}!`);
        } else if (getCardsScore(userCards) == getCardsScore(botCards)) {
          setAlertMessage(`${intl.messages['tie']}`);
        } else {
          setAlertMessage(`${intl.messages['youLost']}`);
        }
      } else if (getCardsScore(userCards) > 21 && getCardsScore(botCards) <= 21) {
        setAlertMessage(`${intl.messages['youLost']}`);
      } else if (getCardsScore(userCards) > 21 && getCardsScore(botCards) > 21) {
        if (getCardsScore(userCards) > getCardsScore(botCards)) {
          setAlertMessage(`${intl.messages['youLost']}`);
        } else if (getCardsScore(userCards) == getCardsScore(botCards)) {
          setAlertMessage(`${intl.messages['tie']}`);
        } else {
          setAlertMessage(`${intl.messages['youWon']}!`);
        }
      }

      setIsShowNewGame(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondBotCardClosed]);

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

  const isDisabled = drawCardsResponse.isLoading || !!alertMessage;

  return (
    <div className={styles.blackJackGame}>
      <div className={styles.blackJackGame_background} />
      <div className={styles.blackJackGame_root}>
        {alertMessage ? (
          <Alert severity='info' className={styles.blackJackGame_root_alert}>
            {alertMessage}
          </Alert>
        ) : null}
        <ImgButton
          icon={<ArrowBackIosNewIcon />}
          onClick={() => {
            navigate(-1);
          }}
          className={styles.blackJackGame_root_back}
        />
        <div className={styles.blackJackGame_root_table}>
          {`${intl.messages['blackJack']} ${intl.messages['game']} #`} {deck ? deck.deck_id : null}
          <div className={styles.blackJackGame_root_table_bot}>
            <div className={styles.blackJackGame_root_table_bot_score}>
              {`${intl.messages['botScore']}: `}
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
              {`${intl.messages['yourScore']}: `}
              <span>{getCardsScore(userCards)}</span>
            </div>

            <div className={styles.blackJackGame_root_table_user_actions}>
              <Button
                onClick={() => {
                  handleDrawCards();
                }}
                className={styles.blackJackGame_root_table_user_actions_button}
                disabled={getCardsScore(userCards) >= 21 || isDisabled}
              >
                {intl.messages['drawCard'] as string}
              </Button>
              <Button
                onClick={handleCountResult}
                className={styles.blackJackGame_root_table_user_actions_button}
                disabled={isDisabled}
              >
                {intl.messages['stop'] as string}
              </Button>
            </div>

            {isShowNewGame ? (
              <Button
                onClick={startGame}
                className={styles.blackJackGame_root_table_user_actions_button}
                style={{ marginTop: '10px' }}
              >
                {intl.messages['startNewGame'] as string}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
