/**
 * Pattern: Randomized algorithms
 * Problem: Reservoir Sampling (LeetCode 382 / 398)
 *
 * Randomly pick an element from an unknown or dynamic stream of size N with equal probability 1/N.
 */

// Optimal: Reservoir Sampling: Keep 1 item (or k items). For i-th element (1-indexed), replace with prob 1/i.
// Time: O(N), Space: O(1)
export class ReservoirSampler {
  private stream: number[];
  constructor(stream: number[]) {
    this.stream = stream;
  }

  sampleOne(): number {
    let chosen = this.stream[0];
    for (let i = 1; i < this.stream.length; i++) {
      // Pick random int in [0, i]
      const r = Math.floor(Math.random() * (i + 1));
      if (r === 0) {
        chosen = this.stream[i];
      }
    }
    return chosen;
  }

  sampleK(k: number): number[] {
    const reservoir: number[] = this.stream.slice(0, k);
    for (let i = k; i < this.stream.length; i++) {
      const r = Math.floor(Math.random() * (i + 1));
      if (r < k) {
        reservoir[r] = this.stream[i];
      }
    }
    return reservoir;
  }
}

// Test cases
const rsSampler = new ReservoirSampler([10, 20, 30, 40, 50]);
const one = rsSampler.sampleOne();
if (![10, 20, 30, 40, 50].includes(one)) throw new Error("Invalid reservoir sample");
const kSample = rsSampler.sampleK(3);
if (kSample.length !== 3) throw new Error("Expected sample size 3");
console.log("Reservoir Sampling passed!");
