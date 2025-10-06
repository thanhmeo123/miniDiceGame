System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DiceService, _crd;

  function _reportPossibleCrUseOfRandomService(extras) {
    _reporterNs.report("RandomService", "./RandomService", _context.meta, extras);
  }

  _export("DiceService", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "86b0djSeXBMDZP8qEjrXNDC", "DiceService", undefined);

      _export("DiceService", DiceService = class DiceService {
        constructor(rng) {
          this.rng = rng;
        }

        roll() {
          return [this.rng.randInt(1, 6), this.rng.randInt(1, 6), this.rng.randInt(1, 6)];
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=caa651c755f836d88c624584f3d0515c51e4263e.js.map