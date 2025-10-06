System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, RandomService, _crd;

  _export("RandomService", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "103e7+lX6lLFq0uGPns2rm0", "RandomService", undefined);

      _export("RandomService", RandomService = class RandomService {
        constructor(randFn) {
          if (randFn === void 0) {
            randFn = Math.random;
          }

          this.randFn = randFn;
        }

        randInt(min, max) {
          return Math.floor(this.randFn() * (max - min + 1)) + min;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ca67844926e02f218813c3cfa65d2c2da0cf090c.js.map