import { RandomService } from './RandomService';

export class DiceService {
  constructor(private rng: RandomService) {}

  roll(): [number, number, number] {
    return [
      this.rng.randInt(1, 6),
      this.rng.randInt(1, 6),
      this.rng.randInt(1, 6),
    ];
  }
}
