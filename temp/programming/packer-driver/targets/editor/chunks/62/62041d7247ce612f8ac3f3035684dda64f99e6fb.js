System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, calculateResult, RoundManager, _crd;

  function _reportPossibleCrUseOfDiceService(extras) {
    _reporterNs.report("DiceService", "./DiceService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScoreManager(extras) {
    _reporterNs.report("ScoreManager", "./ScoreManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHistoryManager(extras) {
    _reporterNs.report("HistoryManager", "./HistoryManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcalculateResult(extras) {
    _reporterNs.report("calculateResult", "./ResultCalculator", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBet(extras) {
    _reporterNs.report("Bet", "./models", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRoundRecord(extras) {
    _reporterNs.report("RoundRecord", "./models", _context.meta, extras);
  }

  _export("RoundManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      calculateResult = _unresolved_2.calculateResult;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "68ecepqR5NHOZdkfmYH7k8v", "RoundManager", undefined); // assets/scripts/core/RoundManager.ts


      _export("RoundManager", RoundManager = class RoundManager {
        constructor(diceService, scoreManager, history, onStateChange) {
          this.state = 'Idle';
          this.currentBet = null;
          this.lastDice = null;
          this.diceService = diceService;
          this.scoreManager = scoreManager;
          this.history = history;
          this.onStateChange = onStateChange;
        }

        setState(s) {
          this.state = s;
          if (this.onStateChange) this.onStateChange(s);
        } // helper để xóa bet (an toàn)


        clearBet() {
          this.currentBet = null; // khi clear, ta có thể chuyển về Idle

          this.setState('Idle');
        }

        startBetting() {
          this.clearBet();
          this.setState('Betting');
        }

        placeBet(bet) {
          if (bet.amount <= 0) throw new Error('Bet must > 0');
          if (bet.amount > this.scoreManager.balance) throw new Error('Not enough balance');
          this.currentBet = bet;
          this.setState('Betting');
        }

        roll() {
          if (!this.currentBet) throw new Error('No bet placed!'); // bước 1: chuyển sang Rolling

          this.setState('Rolling'); // bước 2: gieo xúc xắc

          const dice = this.diceService.roll();
          this.lastDice = dice; // bước 3: tính kết quả

          const calc = (_crd && calculateResult === void 0 ? (_reportPossibleCrUseOfcalculateResult({
            error: Error()
          }), calculateResult) : calculateResult)(dice, this.currentBet); // bước 4: chuyển sang Result (UI nên hiển thị WIN/LOSE lúc này)

          this.setState('Result'); // bước 5: cập nhật điểm

          this.scoreManager.change(calc.delta); // bước 6: tạo record lịch sử chuẩn (kiểu RoundRecord)

          const record = {
            timestamp: new Date().toISOString(),
            dice,
            total: calc.total,
            bet: this.currentBet,
            result: calc.win ? 'WIN' : 'LOSE',
            balanceAfter: this.scoreManager.balance
          }; // bước 7: lưu vào HistoryManager (format history UI khác, HistoryManager chịu)

          this.history.add({
            time: new Date().toLocaleTimeString(),
            dice,
            total: calc.total,
            betType: this.currentBet.type,
            result: calc.win ? 'WIN' : 'LOSE',
            balance: this.scoreManager.balance
          }); // bước 8: settle hoàn tất

          this.setState('Settle'); // reset bet ngay khi vòng kết thúc để tránh reuse

          this.currentBet = null; // trở về Idle để bắt đầu ván tiếp theo

          this.setState('Idle');
          return {
            dice,
            calc
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=62041d7247ce612f8ac3f3035684dda64f99e6fb.js.map