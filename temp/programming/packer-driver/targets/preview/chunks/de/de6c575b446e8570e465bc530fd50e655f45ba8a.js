System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _crd;

  function calculateResult(dice, bet) {
    var total = dice.reduce((s, v) => s + v, 0);
    var win = false;
    var multiplier = 0;
    var isTai = total >= 11 && total <= 17;
    var isXiu = total >= 4 && total <= 10;

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

    var delta = win ? bet.amount * multiplier : -bet.amount;
    return {
      total,
      win,
      multiplier,
      delta,
      betType: bet.type
    }; // thêm ở đây
  }

  function _reportPossibleCrUseOfBet(extras) {
    _reporterNs.report("Bet", "./models", _context.meta, extras);
  }

  _export("calculateResult", calculateResult);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "65016/ZbGlJXJmc2ZPPxj7q", "ResultCalculator", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=de6c575b446e8570e465bc530fd50e655f45ba8a.js.map