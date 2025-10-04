import { ScoreManager } from '../assets/scripts/core/ScoreManager';

class MockStorage {
  private data: Record<string, string> = {};
  getItem(k: string) { return this.data[k] ?? null; }
  setItem(k: string, v: string) { this.data[k] = v; }
}

test('khởi tạo mặc định là 1000 khi chưa có dữ liệu', () => {
  const sm = new ScoreManager(new MockStorage());
  expect(sm.balance).toBe(1000);
});

test('khởi tạo lại từ storage nếu dữ liệu hợp lệ', () => {
  const storage = new MockStorage();
  storage.setItem('mini-dice-balance', '500');
  const sm = new ScoreManager(storage);
  expect(sm.balance).toBe(500);
});

test('reset về 1000 nếu dữ liệu bị NaN', () => {
  const storage = new MockStorage();
  storage.setItem('mini-dice-balance', 'NaN');
  const sm = new ScoreManager(storage);
  expect(sm.balance).toBe(1000);
});

test('cập nhật điểm sau khi change', () => {
  const storage = new MockStorage();
  const sm = new ScoreManager(storage);
  sm.change(-200);
  expect(sm.balance).toBe(800);
  expect(storage.getItem('mini-dice-balance')).toBe('800');
});
