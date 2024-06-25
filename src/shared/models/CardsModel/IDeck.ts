export interface IDeck {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  piles?: any[];
}
