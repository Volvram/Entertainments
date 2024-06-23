import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useLazyCreateDeckQuery, useLazyRequestDeckQuery } from '@/shared/api/CardsService.ts';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux.ts';
import { Button } from '@/shared/ui/Button';
import { CardsSlice } from '@/store/reducers/CardsSlice.ts';

import styles from './styles.module.scss';

export const BlackJackMenu: React.FC = () => {
  const navigate = useNavigate();

  const { cards } = useAppSelector((state) => state.cardsReducer);
  const { setCardGame, addDeck } = CardsSlice.actions;
  const dispatch = useAppDispatch();
  const [createNewDeck, createdDeck] = useLazyCreateDeckQuery();
  const [requestDeck, deck] = useLazyRequestDeckQuery();

  // Если в списке карточных игр нет Блэк-Джека, то создать
  React.useEffect(() => {
    if (!cards.games['black-jack']) {
      dispatch(setCardGame({ id: 'black-jack', name: 'Блэк-Джек' }));
    }
  }, [cards, dispatch, setCardGame]);

  // Если произошел запрос на создание колоды
  React.useEffect(() => {
    if (createdDeck.error) {
      alert(createdDeck.error);
      return;
    }
    if (createdDeck.data) {
      dispatch(addDeck({ gameId: 'black-jack', deckId: createdDeck.data.deck_id }));
      navigate(`../game/${createdDeck.data.deck_id}`);
    }
  }, [createdDeck, dispatch, addDeck, navigate]);

  // Если произошел запрос на получение
  React.useEffect(() => {
    if (deck.error) {
      alert(deck.error);
      return;
    }
    if (deck.data) {
      navigate(`../game/${deck.data.deck_id}`);
    }
  }, [deck, navigate]);

  const handleCreateNewDeck = () => {
    const params = {
      shuffle: true,
    };

    createNewDeck(params);
  };

  const handleContinueLastGame = () => {
    const lastGame = cards.games['black-jack'].deckIds[0];

    requestDeck(lastGame);
  };

  return (
    <div className={styles.blackJackMenu}>
      <h1 className={styles.blackJackMenu_h1}>Блэк-Джек</h1>
      <h3 className={styles.blackJackMenu_h3}>Меню</h3>
      <div className={styles.blackJackMenu_buttons}>
        <Button onClick={handleCreateNewDeck}>Начать игру</Button>
        <Button onClick={handleContinueLastGame}>Продолжить игру</Button>
      </div>
    </div>
  );
};
