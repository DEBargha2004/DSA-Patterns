/**
 * Problem: Find Median from Data Stream (LeetCode 295)
 * Difficulty: Hard
 * Pattern: HP3 - Two heaps for a running median
 *
 * Find median in constant time as numbers are added.
 */

// --- Optimal Approach (Max-Heap for lower half, Min-Heap for upper half) ---
// Time Complexity: addNum: O(log n), findMedian: O(1)
// Space Complexity: O(n)
export class MedianFinder {
  private low: number[] = [];  // max heap (negated numbers)
  private high: number[] = []; // min heap

  addNum(num: number): void {
    if (this.low.length === 0 || num <= -this.low[0]) {
      this.pushLow(num);
    } else {
      this.pushHigh(num);
    }

    // Balance sizes: low can have at most 1 more element than high
    if (this.low.length > this.high.length + 1) {
      this.pushHigh(this.popLow());
    } else if (this.high.length > this.low.length) {
      this.pushLow(this.popHigh());
    }
  }

  findMedian(): number {
    if (this.low.length > this.high.length) {
      return -this.low[0];
    }
    return (-this.low[0] + this.high[0]) / 2;
  }

  private pushLow(val: number): void {
    this.low.push(-val);
    let i = this.low.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.low[i] < this.low[p]) {
        [this.low[i], this.low[p]] = [this.low[p], this.low[i]];
        i = p;
      } else break;
    }
  }

  private popLow(): number {
    const min = this.low[0];
    const end = this.low.pop()!;
    if (this.low.length > 0) {
      this.low[0] = end;
      this.sinkLow(0);
    }
    return -min;
  }

  private sinkLow(i: number): void {
    const n = this.low.length;
    while (true) {
      let s = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.low[l] < this.low[s]) s = l;
      if (r < n && this.low[r] < this.low[s]) s = r;
      if (s !== i) {
        [this.low[i], this.low[s]] = [this.low[s], this.low[i]];
        i = s;
      } else break;
    }
  }

  private pushHigh(val: number): void {
    this.high.push(val);
    let i = this.high.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.high[i] < this.high[p]) {
        [this.high[i], this.high[p]] = [this.high[p], this.high[i]];
        i = p;
      } else break;
    }
  }

  private popHigh(): number {
    const min = this.high[0];
    const end = this.high.pop()!;
    if (this.high.length > 0) {
      this.high[0] = end;
      this.sinkHigh(0);
    }
    return min;
  }

  private sinkHigh(i: number): void {
    const n = this.high.length;
    while (true) {
      let s = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.high[l] < this.high[s]) s = l;
      if (r < n && this.high[r] < this.high[s]) s = r;
      if (s !== i) {
        [this.high[i], this.high[s]] = [this.high[s], this.high[i]];
        i = s;
      } else break;
    }
  }
}

// --- Test Verification ---
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.assert(mf.findMedian() === 1.5, "Test 1 failed");
mf.addNum(3);
console.assert(mf.findMedian() === 2, "Test 2 failed");
