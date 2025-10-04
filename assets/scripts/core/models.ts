export type BetType = 'TAI' | 'XIU' | 'TOTAL';

export interface Bet {
  type: BetType;
  amount: number;
  totalGuess?: number; // chỉ dùng cho TOTAL
}

export interface RoundRecord {
  timestamp: string;
  dice: [number, number, number];
  total: number;
  bet: Bet;
  result: 'WIN' | 'LOSE';
  balanceAfter: number;
}
