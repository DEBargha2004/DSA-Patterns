/**
 * Problem: Range Sum Query - Immutable (LeetCode 303)
 * Difficulty: Easy
 * Pattern: A6 - Prefix sums
 *
 * Given an integer array nums, handle multiple queries of the following type:
 * Calculate the sum of elements between indices left and right inclusive where left <= right.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n) per query, O(1) precomputation
// Space Complexity: O(1)
export class NumArrayBruteForce {
  private nums: number[];

  constructor(nums: number[]) {
    this.nums = [...nums];
  }

  sumRange(left: number, right: number): number {
    let sum = 0;
    for (let i = left; i <= right; i++) {
      sum += this.nums[i];
    }
    return sum;
  }
}

// --- 2. Optimal Approach (Prefix Sum Array) ---
// Time Complexity: O(1) per query, O(n) precomputation
// Space Complexity: O(n)
export class NumArrayOptimal {
  private prefixSums: number[];

  constructor(nums: number[]) {
    this.prefixSums = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefixSums[i + 1] = this.prefixSums[i] + nums[i];
    }
  }

  sumRange(left: number, right: number): number {
    return this.prefixSums[right + 1] - this.prefixSums[left];
  }
}

// --- Test Verification ---
const obj = new NumArrayOptimal([-2, 0, 3, -5, 2, -1]);
console.assert(obj.sumRange(0, 2) === 1, "Test 1 failed");
console.assert(obj.sumRange(2, 5) === -1, "Test 2 failed");
console.assert(obj.sumRange(0, 5) === -3, "Test 3 failed");
