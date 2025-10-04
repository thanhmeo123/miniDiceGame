import { _decorator, Component, Label, Button, EditBox } from 'cc';
import { RandomService } from '../core/RandomService';
import { DiceService } from '../core/DiceService';
import { ScoreManager } from '../core/ScoreManager';
import { HistoryManager } from '../core/HistoryManager';
import { RoundManager } from '../core/RoundManager';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Label) balanceLabel: Label = null!;
  @property(Label) resultLabel: Label = null!;
  @property(Label) diceLabel: Label = null!;
  @property(Label) historyLabel: Label = null!;
  @property(EditBox) amountInput: EditBox = null!;
  @property(EditBox) totalGuessInput: EditBox = null!;
  @property(Button) rollButton: Button = null!;
  @property(Button) taiButton: Button = null!;
  @property(Button) xiuButton: Button = null!;

  private round!: RoundManager;
  private score!: ScoreManager;
  private history!: HistoryManager;

  onLoad() {
    const rng = new RandomService();
    const diceService = new DiceService(rng);
    this.score = new ScoreManager();
    this.history = new HistoryManager();
    this.round = new RoundManager(
      diceService,
      this.score,
      this.history,
      (s: string) => this.onStateChange(s)
    );

    this.updateBalance();
    this.updateHistoryUI();
    this.resetInputs();
  }

  onStateChange(s: string) {
    if (s === 'Rolling') {
      this.resultLabel.string = "Rolling...";
    }
    if (s === 'Settle') {
      this.resetInputs();
    }
  }

  updateBalance() {
    this.balanceLabel.string = `Balance: ${this.score.balance}`;
  }

  updateHistoryUI() {
    const list = this.history.histories;
    const lines = [...list].reverse().map(h => {
      return `${h.time} | ${h.dice.join(',')} | ${h.total} | ${h.betType} | ${h.result} | ${h.balance}`;
    });
    this.historyLabel.string = lines.join('\n');
  }

  // =============================
  // Reset Inputs sau mỗi vòng
  // =============================
  resetInputs() {
    this.amountInput.string = '';
    this.totalGuessInput.string = '';
    if (this.rollButton) this.rollButton.interactable = false;
    if (this.taiButton) this.taiButton.interactable = true;
    if (this.xiuButton) this.xiuButton.interactable = true;
    if (this.totalGuessInput) this.totalGuessInput.enabled = true;
  }

  // =============================
  // Đặt cược
  // =============================
  placeBetTai() {
    this.placeBet('TAI');
  }

  placeBetXiu() {
    this.placeBet('XIU');
  }

  placeBetTotal() {
    this.placeBet('TOTAL');
  }

  placeBet(type: 'TAI' | 'XIU' | 'TOTAL') {
    const amt = parseInt(this.amountInput.string || '0', 10);
    if (amt <= 0 || isNaN(amt)) {
      this.resultLabel.string = 'Nhập số điểm hợp lệ!';
      if (this.rollButton) this.rollButton.interactable = false;
      return;
    }

    let guess: number | undefined;

    if (type === 'TOTAL') {
      guess = parseInt(this.totalGuessInput.string || '0', 10);
      if (isNaN(guess) || guess < 3 || guess > 18) {
        this.resultLabel.string = 'Nhập tổng hợp lệ (3-18)!';
        if (this.rollButton) this.rollButton.interactable = false;
        return;
      }
    }

    try {
      if (type === 'TOTAL') {
        this.round.placeBet({ type, amount: amt, totalGuess: guess });
        // disable 2 nút Tài/Xỉu
        if (this.taiButton) this.taiButton.interactable = false;
        if (this.xiuButton) this.xiuButton.interactable = false;
      } else {
        this.round.placeBet({ type, amount: amt });
        // disable ô nhập tổng
        if (this.totalGuessInput) this.totalGuessInput.enabled = false;
      }

      this.resultLabel.string = `Đặt ${amt} vào ${type}${type === 'TOTAL' ? ` (Tổng: ${guess})` : ''}`;
      if (this.rollButton) this.rollButton.interactable = true;

    } catch (e: any) {
      this.resultLabel.string = `Lỗi: ${e.message}`;
      if (this.rollButton) this.rollButton.interactable = false;
    }
  }

  // =============================
  // Roll
  // =============================
  onRoll() {
    try {
      if (!this.round.currentBet) {
        this.resultLabel.string = 'Bạn chưa đặt cược!';
        return;
      }

      const { dice, calc } = this.round.roll();

      const total = calc.total;
      const delta = calc.delta;

      // Tài/Xỉu text từ tổng
      let taiXiu = '';
      if (total >= 11 && total <= 17) taiXiu = 'TAI';
      else if (total >= 4 && total <= 10) taiXiu = 'XIU';
      else taiXiu = '—';

      // Hiển thị xúc xắc
      this.diceLabel.string = `Dice: ${dice.join('/')} (Total: ${total}, ${taiXiu})`;

      // Hiển thị kết quả
      this.resultLabel.string = calc.win
        ? `WIN (+${delta})`
        : `LOSE (${delta})`;

      this.updateBalance();
      this.updateHistoryUI();

      // Sau Roll xong, reset để chuẩn bị vòng mới
      this.resetInputs();

    } catch (err: any) {
      this.resultLabel.string = `Lỗi: ${err.message}`;
    }
  }
}
