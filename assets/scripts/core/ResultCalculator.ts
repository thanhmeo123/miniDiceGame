import { Bet } from './models';

export interface CalcResult {
  total: number;
  win: boolean;
  multiplier: number;
  delta: number;
  betType: string; 
}

export function calculateResult(dice: number[], bet: Bet): CalcResult {
  const total = dice.reduce((s, v) => s + v, 0);
  let win = false;
  let multiplier = 0;

  const isTai = total >= 11 && total <= 17;
  const isXiu = total >= 4 && total <= 10;

  if (bet.type === 'TAI') {
    win = isTai;
    multiplier = 1;
  } else if (bet.type === 'XIU') {
    win = isXiu;
    multiplier = 1;
  } else if (bet.type === 'TOTAL') {
    win = bet.totalGuess === total;
    multiplier = 5;
  }

  const delta = win ? bet.amount * multiplier : -bet.amount;
  return { total, win, multiplier, delta, betType: bet.type }; // thêm ở đây
}
