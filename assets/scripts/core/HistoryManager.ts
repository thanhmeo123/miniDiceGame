export interface RoundHistory {
  time: string;      // thời gian ván chơi
  dice: number[];    // 3 mặt xúc xắc
  total: number;     // tổng điểm
  betType: string;   // TAI / XIU / TOTAL-x
  result: string;    // WIN / LOSE
  balance: number;   // điểm sau ván
}

export class HistoryManager {
  private key = 'mini-dice-history';
  private maxRecords = 10;
  private storage: Storage;

  histories: RoundHistory[] = [];

  constructor(storage: Storage = window.localStorage) {
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

  add(record: RoundHistory) {
    this.histories.unshift(record); // thêm vào đầu danh sách
    if (this.histories.length > this.maxRecords) {
      this.histories = this.histories.slice(0, this.maxRecords); // giữ lại 10 bản ghi
    }
    this.save();
  }

  save() {
    this.storage.setItem(this.key, JSON.stringify(this.histories));
  }
}