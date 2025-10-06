System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, HistoryManager, _crd;

  _export("HistoryManager", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "213e925BkFJ7KXlDE+vkHwF", "HistoryManager", undefined);

      _export("HistoryManager", HistoryManager = class HistoryManager {
        constructor(storage = window.localStorage) {
          this.key = 'mini-dice-history';
          this.maxRecords = 10;
          this.storage = void 0;
          this.histories = [];
          this.storage = storage;
          const raw = this.storage.getItem(this.key);

          if (raw) {
            try {
              this.histories = JSON.parse(raw);
            } catch {
              this.histories = [];
            }
          }
        }

        add(record) {
          this.histories.unshift(record); // thêm vào đầu danh sách

          if (this.histories.length > this.maxRecords) {
            this.histories = this.histories.slice(0, this.maxRecords); // giữ lại 10 bản ghi
          }

          this.save();
        }

        save() {
          this.storage.setItem(this.key, JSON.stringify(this.histories));
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9068addb89680a33256fdbc4ff9aa24bcb18f941.js.map