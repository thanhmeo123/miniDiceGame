System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, ScoreManager, _crd;

  _export("ScoreManager", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4aba9USSxlI/YTUTU1g2mF4", "ScoreManager", undefined);

      _export("ScoreManager", ScoreManager = class ScoreManager {
        constructor(storage = window.localStorage, key = 'mini-dice-balance') {
          this.key = void 0;
          this.storage = void 0;
          this.balance = void 0;
          this.storage = storage;
          this.key = key;
          const raw = this.storage.getItem(this.key); // convert safely

          let val = raw !== null ? Number(raw) : NaN; // fallback nếu val là NaN hoặc <0

          if (isNaN(val) || val < 0) {
            this.balance = 1000; // điểm mặc định khi bắt đầu
          } else {
            this.balance = Math.floor(val); // đảm bảo là số nguyên
          }

          this.save();
        }

        change(delta) {
          this.balance += delta;
          if (this.balance < 0) this.balance = 0;
          this.save();
        }

        save() {
          this.storage.setItem(this.key, String(this.balance));
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8bfcd1807c634da2a5c45d91fc09169af5fd1262.js.map