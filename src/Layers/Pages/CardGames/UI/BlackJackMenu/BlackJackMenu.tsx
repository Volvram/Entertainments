import React from 'react';

import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/Layers/App/ConfigureRTK/hooks.ts';
import { CardsSlice } from '@/Layers/Entities/Cards/model/Cards/CardsSlice.ts';
import {
  useLazyCreateDeckQuery,
  useLazyRequestDeckQuery,
} from '@/Layers/Shared/api/cards/CardsService.ts';
import { isFetchBaseQueryErrorTypeGuard } from '@/Layers/Shared/lib/TypeGuards.ts';
import { Button } from '@/Layers/Shared/UI/Button';

import styles from './styles.module.scss';

export const BlackJackMenu: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { cards } = useAppSelector((state) => state.cardsReducer);
  const { setCardGame, addDeck } = CardsSlice.actions;
  const dispatch = useAppDispatch();
  const [createNewDeck] = useLazyCreateDeckQuery();
  const [requestDeck] = useLazyRequestDeckQuery();

  // Если в списке карточных игр нет Блэк-Джека, то создать
  React.useEffect(() => {
    if (!cards.games['black-jack']) {
      dispatch(setCardGame({ id: 'black-jack', name: intl.messages['blackJack'] as string }));
    }
  }, [cards, dispatch, intl.messages, setCardGame]);

  const handleCreateNewDeck = () => {
    const params = {
      shuffle: true,
    };

    createNewDeck(params)
      .unwrap()
      .then((data) => {
        dispatch(addDeck({ gameId: 'black-jack', deckId: data.deck_id }));
        navigate(`../game/${data.deck_id}`);
      })
      .catch((error) => {
        if (isFetchBaseQueryErrorTypeGuard(error) && error.data?.error) {
          alert(error.data?.error);
        }
      });
  };

  const handleContinueLastGame = () => {
    const lastGame = cards.games['black-jack'].deckIds[0];

    requestDeck(lastGame)
      .unwrap()
      .then((data) => {
        navigate(`../game/${data.deck_id}`);
      })
      .catch((error) => {
        if (isFetchBaseQueryErrorTypeGuard(error) && error.data?.error) {
          alert(error.data?.error);
        }
      });
  };

  return (
    <div className={styles.blackJackMenu}>
      <h1 className={styles.blackJackMenu_h1}>{intl.messages['blackJack'] as string}</h1>
      <h3 className={styles.blackJackMenu_h3}>{intl.messages['menu'] as string}</h3>
      <div className={styles.blackJackMenu_buttons}>
        <Button onClick={handleCreateNewDeck}>{intl.messages['startGame'] as string}</Button>
        <Button onClick={handleContinueLastGame}>{intl.messages['continueGame'] as string}</Button>
      </div>
    </div>
  );
};
