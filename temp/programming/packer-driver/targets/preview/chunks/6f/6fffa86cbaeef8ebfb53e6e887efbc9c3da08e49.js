System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, EditBox, RandomService, DiceService, ScoreManager, HistoryManager, RoundManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfRandomService(extras) {
    _reporterNs.report("RandomService", "../core/RandomService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDiceService(extras) {
    _reporterNs.report("DiceService", "../core/DiceService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScoreManager(extras) {
    _reporterNs.report("ScoreManager", "../core/ScoreManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHistoryManager(extras) {
    _reporterNs.report("HistoryManager", "../core/HistoryManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRoundManager(extras) {
    _reporterNs.report("RoundManager", "../core/RoundManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      Button = _cc.Button;
      EditBox = _cc.EditBox;
    }, function (_unresolved_2) {
      RandomService = _unresolved_2.RandomService;
    }, function (_unresolved_3) {
      DiceService = _unresolved_3.DiceService;
    }, function (_unresolved_4) {
      ScoreManager = _unresolved_4.ScoreManager;
    }, function (_unresolved_5) {
      HistoryManager = _unresolved_5.HistoryManager;
    }, function (_unresolved_6) {
      RoundManager = _unresolved_6.RoundManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "799c3LvFgNEh7ZPBNnElc/g", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Button', 'EditBox']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(EditBox), _dec7 = property(EditBox), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Button), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "balanceLabel", _descriptor, this);

          _initializerDefineProperty(this, "resultLabel", _descriptor2, this);

          _initializerDefineProperty(this, "diceLabel", _descriptor3, this);

          _initializerDefineProperty(this, "historyLabel", _descriptor4, this);

          _initializerDefineProperty(this, "amountInput", _descriptor5, this);

          _initializerDefineProperty(this, "totalGuessInput", _descriptor6, this);

          _initializerDefineProperty(this, "rollButton", _descriptor7, this);

          _initializerDefineProperty(this, "taiButton", _descriptor8, this);

          _initializerDefineProperty(this, "xiuButton", _descriptor9, this);

          this.round = void 0;
          this.score = void 0;
          this.history = void 0;
        }

        onLoad() {
          var rng = new (_crd && RandomService === void 0 ? (_reportPossibleCrUseOfRandomService({
            error: Error()
          }), RandomService) : RandomService)();
          var diceService = new (_crd && DiceService === void 0 ? (_reportPossibleCrUseOfDiceService({
            error: Error()
          }), DiceService) : DiceService)(rng);
          this.score = new (_crd && ScoreManager === void 0 ? (_reportPossibleCrUseOfScoreManager({
            error: Error()
          }), ScoreManager) : ScoreManager)();
          this.history = new (_crd && HistoryManager === void 0 ? (_reportPossibleCrUseOfHistoryManager({
            error: Error()
          }), HistoryManager) : HistoryManager)();
          this.round = new (_crd && RoundManager === void 0 ? (_reportPossibleCrUseOfRoundManager({
            error: Error()
          }), RoundManager) : RoundManager)(diceService, this.score, this.history, s => this.onStateChange(s));
          this.updateBalance();
          this.updateHistoryUI();
          this.resetInputs();
        }

        onStateChange(s) {
          if (s === 'Rolling') {
            this.resultLabel.string = "Rolling...";
          }

          if (s === 'Settle') {
            this.resetInputs();
          }
        }

        updateBalance() {
          this.balanceLabel.string = "Balance: " + this.score.balance;
        }

        updateHistoryUI() {
          var list = this.history.histories;
          var lines = [...list].reverse().map(h => {
            return h.time + " | " + h.dice.join(',') + " | " + h.total + " | " + h.betType + " | " + h.result + " | " + h.balance;
          });
          this.historyLabel.string = lines.join('\n');
        } // =============================
        // Reset Inputs sau mỗi vòng
        // =============================


        resetInputs() {
          this.amountInput.string = '';
          this.totalGuessInput.string = '';
          if (this.rollButton) this.rollButton.interactable = false;
          if (this.taiButton) this.taiButton.interactable = true;
          if (this.xiuButton) this.xiuButton.interactable = true;
          if (this.totalGuessInput) this.totalGuessInput.enabled = true;
        } // =============================
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

        placeBet(type) {
          var amt = parseInt(this.amountInput.string || '0', 10);

          if (amt <= 0 || isNaN(amt)) {
            this.resultLabel.string = 'Nhập số điểm hợp lệ!';
            if (this.rollButton) this.rollButton.interactable = false;
            return;
          }

          var guess;

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
              this.round.placeBet({
                type,
                amount: amt,
                totalGuess: guess
              }); // disable 2 nút Tài/Xỉu

              if (this.taiButton) this.taiButton.interactable = false;
              if (this.xiuButton) this.xiuButton.interactable = false;
            } else {
              this.round.placeBet({
                type,
                amount: amt
              }); // disable ô nhập tổng

              if (this.totalGuessInput) this.totalGuessInput.enabled = false;
            }

            this.resultLabel.string = "\u0110\u1EB7t " + amt + " v\xE0o " + type + (type === 'TOTAL' ? " (T\u1ED5ng: " + guess + ")" : '');
            if (this.rollButton) this.rollButton.interactable = true;
          } catch (e) {
            this.resultLabel.string = "L\u1ED7i: " + e.message;
            if (this.rollButton) this.rollButton.interactable = false;
          }
        } // =============================
        // Roll
        // =============================


        onRoll() {
          try {
            if (!this.round.currentBet) {
              this.resultLabel.string = 'Bạn chưa đặt cược!';
              return;
            }

            var {
              dice,
              calc
            } = this.round.roll();
            var total = calc.total;
            var delta = calc.delta; // Tài/Xỉu text từ tổng

            var taiXiu = '';
            if (total >= 11 && total <= 17) taiXiu = 'TAI';else if (total >= 4 && total <= 10) taiXiu = 'XIU';else taiXiu = '—'; // Hiển thị xúc xắc

            this.diceLabel.string = "Dice: " + dice.join('/') + " (Total: " + total + ", " + taiXiu + ")"; // Hiển thị kết quả

            this.resultLabel.string = calc.win ? "WIN (+" + delta + ")" : "LOSE (" + delta + ")";
            this.updateBalance();
            this.updateHistoryUI(); // Sau Roll xong, reset để chuẩn bị vòng mới

            this.resetInputs();
          } catch (err) {
            this.resultLabel.string = "L\u1ED7i: " + err.message;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "balanceLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "diceLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "historyLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "amountInput", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "totalGuessInput", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rollButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "taiButton", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "xiuButton", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6fffa86cbaeef8ebfb53e6e887efbc9c3da08e49.js.map