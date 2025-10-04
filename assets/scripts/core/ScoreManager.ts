export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export class ScoreManager {
  private key: string;
  private storage: StorageLike;
  balance: number;

  constructor(storage: StorageLike = window.localStorage, key = 'mini-dice-balance') {
    this.storage = storage;
    this.key = key;

    const raw = this.storage.getItem(this.key);

    // convert safely
    let val = raw !== null ? Number(raw) : NaN;

    // fallback nếu val là NaN hoặc <0
    if (isNaN(val) || val < 0) {
      this.balance = 1000; // điểm mặc định khi bắt đầu
    } else {
      this.balance = Math.floor(val); // đảm bảo là số nguyên
    }

    this.save();
  }

  change(delta: number) {
    this.balance += delta;
    if (this.balance < 0) this.balance = 0;
    this.save();
  }

  save() {
    this.storage.setItem(this.key, String(this.balance));
  }
}
