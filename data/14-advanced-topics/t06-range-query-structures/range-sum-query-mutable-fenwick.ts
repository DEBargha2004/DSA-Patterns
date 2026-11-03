/**
 * Pattern: Range-query structures
 * Problem: Range Sum Query - Mutable (LeetCode 307) via Fenwick Tree (Binary Indexed Tree)
 */

// Brute Force: Array scan for range sum
// Time: Update O(1), Query O(N), Space: O(N)
export class NumArrayBrute {
  private nums: number[];
  constructor(nums: number[]) {
    this.nums = [...nums];
  }
  update(index: number, val: number): void {
    this.nums[index] = val;
  }
  sumRange(left: number, right: number): number {
    let sum = 0;
    for (let i = left; i <= right; i++) sum += this.nums[i];
    return sum;
  }
}

// Optimal: Fenwick Tree (Binary Indexed Tree)
// Time: Update O(log N), Query O(log N), Space: O(N)
export class NumArrayFenwick {
  private tree: number[];
  private nums: number[];
  private n: number;

  constructor(nums: number[]) {
    this.n = nums.length;
    this.nums = new Array(this.n).fill(0);
    this.tree = new Array(this.n + 1).fill(0);

    for (let i = 0; i < this.n; i++) {
      this.update(i, nums[i]);
    }
  }

  private add(index: number, delta: number): void {
    let i = index + 1; // 1-indexed
    while (i <= this.n) {
      this.tree[i] += delta;
      i += i & -i; // add lowest set bit
    }
  }

  update(index: number, val: number): void {
    const delta = val - this.nums[index];
    this.nums[index] = val;
    this.add(index, delta);
  }

  private prefixSum(index: number): number {
    let sum = 0;
    let i = index + 1;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i; // subtract lowest set bit
    }
    return sum;
  }

  sumRange(left: number, right: number): number {
    return this.prefixSum(right) - (left > 0 ? this.prefixSum(left - 1) : 0);
  }
}

// Test cases
const na = new NumArrayFenwick([1, 3, 5]);
if (na.sumRange(0, 2) !== 9) throw new Error("Expected 9");
na.update(1, 2);
if (na.sumRange(0, 2) !== 8) throw new Error("Expected 8");
console.log("Range Sum Query Mutable Fenwick passed!");
