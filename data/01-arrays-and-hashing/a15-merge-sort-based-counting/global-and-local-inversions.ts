/**
 * Problem: Global and Local Inversions (LeetCode 775)
 * Difficulty: Medium
 * Pattern: A15 - Merge-sort-based counting
 *
 * You are given an integer array nums of length n which represents a permutation of [0, n - 1].
 * A global inversion is where i < j and nums[i] > nums[j].
 * A local inversion is where nums[i] > nums[i + 1].
 * Return true if the number of global inversions is equal to the number of local inversions.
 */

// --- 1. Brute Force Approach (Count Inversions) ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function isIdealPermutationBruteForce(nums: number[]): boolean {
  let globalInv = 0;
  let localInv = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) localInv++;
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) globalInv++;
    }
  }

  return globalInv === localInv;
}

// --- 2. Optimal Approach (Check Non-Local Inversions via Math.abs or Prefix Max) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// Since every local inversion is a global inversion, global == local implies
// NO non-local inversion can exist (i.e. nums[i] > nums[j] for j >= i + 2).
// Equivalently, every element must be at most 1 position away from its value: abs(nums[i] - i) <= 1.
export function isIdealPermutationOptimal(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    if (Math.abs(nums[i] - i) > 1) {
      return false;
    }
  }
  return true;
}

// --- Test Verification ---
console.assert(isIdealPermutationOptimal([1, 0, 2]) === true, "Test 1 failed");
console.assert(isIdealPermutationOptimal([1, 2, 0]) === false, "Test 2 failed");
