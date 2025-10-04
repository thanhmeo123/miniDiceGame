// assets/scripts/core/RoundManager.ts
import { DiceService } from './DiceService';
import { ScoreManager } from './ScoreManager';
import { HistoryManager } from './HistoryManager';
import { calculateResult } from './ResultCalculator';
import { Bet, RoundRecord } from './models';

export type GameState = 'Idle' | 'Betting' | 'Rolling' | 'Result' | 'Settle';

export class RoundManager {
  state: GameState = 'Idle';
  currentBet: Bet | null = null;
  lastDice: [number, number, number] | null = null;

  constructor(
    private diceService: DiceService,
    private scoreManager: ScoreManager,
    private history: HistoryManager,
    private onStateChange?: (s: GameState) => void
  ) {}

  private setState(s: GameState) {
    this.state = s;
    if (this.onStateChange) this.onStateChange(s);
  }

  // helper để xóa bet (an toàn)
  clearBet() {
    this.currentBet = null;
    // khi clear, ta có thể chuyển về Idle
    this.setState('Idle');
  }

  startBetting() {
    this.clearBet();
    this.setState('Betting');
  }

  placeBet(bet: Bet) {
    if (bet.amount <= 0) throw new Error('Bet must > 0');
    if (bet.amount > this.scoreManager.balance) throw new Error('Not enough balance');

    this.currentBet = bet;
    this.setState('Betting');
  }

  roll() {
    if (!this.currentBet) throw new Error('No bet placed!');

    // bước 1: chuyển sang Rolling
    this.setState('Rolling');

    // bước 2: gieo xúc xắc
    const dice = this.diceService.roll();
    this.lastDice = dice;

    // bước 3: tính kết quả
    const calc = calculateResult(dice, this.currentBet);

    // bước 4: chuyển sang Result (UI nên hiển thị WIN/LOSE lúc này)
    this.setState('Result');

    // bước 5: cập nhật điểm
    this.scoreManager.change(calc.delta);

    // bước 6: tạo record lịch sử chuẩn (kiểu RoundRecord)
    const record: RoundRecord = {
      timestamp: new Date().toISOString(),
      dice,
      total: calc.total,
      bet: this.currentBet,
      result: calc.win ? 'WIN' : 'LOSE',
      balanceAfter: this.scoreManager.balance,
    };

    // bước 7: lưu vào HistoryManager (format history UI khác, HistoryManager chịu)
    this.history.add({
      time: new Date().toLocaleTimeString(),
      dice,
      total: calc.total,
      betType: this.currentBet.type,
      result: calc.win ? 'WIN' : 'LOSE',
      balance: this.scoreManager.balance,
    });

    // bước 8: settle hoàn tất
    this.setState('Settle');

    // reset bet ngay khi vòng kết thúc để tránh reuse
    this.currentBet = null;

    // trở về Idle để bắt đầu ván tiếp theo
    this.setState('Idle');

    return { dice, calc };
  }
}
