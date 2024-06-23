type GameType = {
  id: string;
  name: string;
  deckIds: string[];
};

export type CardsType = {
  games: Record<string, GameType>;
};
