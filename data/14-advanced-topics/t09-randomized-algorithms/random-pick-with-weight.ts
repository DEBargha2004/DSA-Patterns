/**
 * Pattern: Randomized algorithms
 * Problem: Random Pick with Weight (LeetCode 528)
 */

// Brute Force: Array expansion repeating index w[i] times
// Time: Init O(Sum(W)), Pick O(1), Space: O(Sum(W))
export class WeightPickerBrute {
  private pool: number[] = [];
  constructor(w: number[]) {
    for (let i = 0; i < w.length; i++) {
      for (let c = 0; c < w[i]; c++) this.pool.push(i);
    }
  }
  pickIndex(): number {
    const rand = Math.floor(Math.random() * this.pool.length);
    return this.pool[rand];
  }
}

// Optimal: Prefix Sums + Binary Search (Roulette Wheel Selection)
// Time: Init O(N), Pick O(log N), Space: O(N)
export class WeightPickerOptimal {
  private prefixSums: number[] = [];
  private totalWeight: number = 0;

  constructor(w: number[]) {
    let running = 0;
    for (const weight of w) {
      running += weight;
      this.prefixSums.push(running);
    }
    this.totalWeight = running;
  }

  pickIndex(): number {
    const target = Math.random() * this.totalWeight;
    let l = 0, r = this.prefixSums.length - 1;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (this.prefixSums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }
}

// Test cases
const wp = new WeightPickerOptimal([1, 3]);
const idx = wp.pickIndex();
if (idx !== 0 && idx !== 1) throw new Error("Invalid picked index");
console.log("Random Pick with Weight passed!");
