// tests/resultCalculator.test.ts
import { calculateResult } from '../assets/scripts/core/ResultCalculator';
import { Bet } from '../assets/scripts/core/models';

test('Tính tổng xúc xắc đúng (total)', () => {
  const bet: Bet = { type: 'TAI', amount: 1 };
  const res = calculateResult([2, 3, 4], bet);
  expect(res.total).toBe(9);
});

test('Tài thắng khi tổng >= 11', () => {
  const bet: Bet = { type: 'TAI', amount: 10 };
  const res = calculateResult([6, 5, 4], bet); // total 15
  expect(res.win).toBe(true);
  expect(res.multiplier).toBe(1);
  expect(res.delta).toBe(10);

  const resLose = calculateResult([2, 2, 2], bet); // total 6
  expect(resLose.win).toBe(false);
  expect(resLose.delta).toBe(-10);
});

test('Xỉu thắng khi tổng 4..10', () => {
  const bet: Bet = { type: 'XIU', amount: 8 };
  const res = calculateResult([1, 3, 4], bet); // total 8
  expect(res.win).toBe(true);
  expect(res.delta).toBe(8);

  const resLose = calculateResult([6, 6, 6], bet); // total 18 (invalid but test LOSE)
  expect(resLose.win).toBe(false);
  expect(resLose.delta).toBe(-8);
});

test('Đoán tổng (TOTAL) chính xác thì thắng với multiplier 5', () => {
  const bet: Bet = { type: 'TOTAL', amount: 5, totalGuess: 9 };
  const res = calculateResult([3, 3, 3], bet); // total 9
  expect(res.win).toBe(true);
  expect(res.multiplier).toBe(5);
  expect(res.delta).toBe(25);

  const resLose = calculateResult([1, 2, 3], bet); // total 6
  expect(resLose.win).toBe(false);
  expect(resLose.delta).toBe(-5);
});
