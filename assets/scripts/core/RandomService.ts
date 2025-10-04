export type RandFn = () => number;

export class RandomService {
  constructor(private randFn: RandFn = Math.random) {}

  randInt(min: number, max: number): number {
    return Math.floor(this.randFn() * (max - min + 1)) + min;
  }
}
