import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCards } from '@/Layers/Pages/CardGames/UI/CardGames/Types.ts';
import { getCardGames } from '@/Layers/Shared/lib/helpers/getCardGames.ts';

interface CardsState {
  cards: TCards;
}

const initialState: CardsState = {
  cards: {
    games: JSON.parse(getCardGames() ?? '{}'),
  },
};

export const CardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardGame(state, action: PayloadAction<{ id: string; name: string }>) {
      state.cards.games[action.payload.id] = { ...action.payload, deckIds: [] };
    },
    addDeck(state, action: PayloadAction<{ gameId: string; deckId: string }>) {
      const exists = state.cards.games[action.payload.gameId].deckIds.find(
        (deckId: string) => deckId == action.payload.deckId
      );

      if (!exists) {
        state.cards.games[action.payload.gameId].deckIds.push(action.payload.deckId);
        localStorage.setItem('cardGames', JSON.stringify(state.cards.games));
      }
    },
    removeDeck(state, action: PayloadAction<{ gameId: string; deckId: string }>) {
      state.cards.games[action.payload.gameId].deckIds = state.cards.games[
        action.payload.gameId
      ].deckIds.filter((deckId: string) => deckId != action.payload.deckId);
      localStorage.setItem('cardGames', JSON.stringify(state.cards.games));
    },
    resetAllDecks(state) {
      state.cards.games = {};
      localStorage.setItem('cardGames', JSON.stringify(state.cards.games));
    },
  },
});
export default CardsSlice.reducer;
