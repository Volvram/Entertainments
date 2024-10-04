export interface IRandomJokeResponse {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export type TRandomJokeRequest = void;
