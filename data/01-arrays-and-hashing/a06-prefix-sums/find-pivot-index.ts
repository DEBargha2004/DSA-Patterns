/**
 * Problem: Find Pivot Index (LeetCode 724)
 * Difficulty: Easy
 * Pattern: A6 - Prefix sums
 *
 * Given an array of integers nums, calculate the pivot index of this array.
 * The pivot index is the index where the sum of all numbers strictly to the left equals
 * the sum of all numbers strictly to the index's right. Return the leftmost pivot index.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - computes left and right sums at each index
// Space Complexity: O(1)
export function pivotIndexBruteForce(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    let leftSum = 0;
    for (let l = 0; l < i; l++) leftSum += nums[l];

    let rightSum = 0;
    for (let r = i + 1; r < nums.length; r++) rightSum += nums[r];

    if (leftSum === rightSum) return i;
  }
  return -1;
}

// --- 2. Optimal Approach (Total Sum & Running Left Sum) ---
// Time Complexity: O(n) - two passes
// Space Complexity: O(1) - no extra arrays needed
export function pivotIndexOptimal(nums: number[]): number {
  const totalSum = nums.reduce((acc, x) => acc + x, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    if (leftSum === rightSum) {
      return i;
    }
    leftSum += nums[i];
  }

  return -1;
}

// --- Test Verification ---
console.assert(pivotIndexOptimal([1, 7, 3, 6, 5, 6]) === 3, "Test 1 failed");
console.assert(pivotIndexOptimal([1, 2, 3]) === -1, "Test 2 failed");
console.assert(pivotIndexOptimal([2, 1, -1]) === 0, "Test 3 failed");
