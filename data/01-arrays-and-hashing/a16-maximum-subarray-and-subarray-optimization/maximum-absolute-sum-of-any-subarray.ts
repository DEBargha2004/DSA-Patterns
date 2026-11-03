/**
 * Problem: Maximum Absolute Sum of Any Subarray (LeetCode 1749)
 * Difficulty: Medium
 * Pattern: A16 - Maximum subarray and subarray optimization
 *
 * You are given an integer array nums. The absolute sum of a subarray [numsl, ..., numsr]
 * is abs(numsl + ... + numsr). Return the maximum absolute sum of any subarray.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function maxAbsoluteSumBruteForce(nums: number[]): number {
  let maxAbs = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      maxAbs = Math.max(maxAbs, Math.abs(sum));
    }
  }
  return maxAbs;
}

// --- 2. Better Approach (Dual Kadane Algorithm) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxAbsoluteSumKadane(nums: number[]): number {
  let maxPos = 0;
  let curMax = 0;
  let minNeg = 0;
  let curMin = 0;

  for (const x of nums) {
    curMax = Math.max(x, curMax + x);
    maxPos = Math.max(maxPos, curMax);

    curMin = Math.min(x, curMin + x);
    minNeg = Math.min(minNeg, curMin);
  }

  return Math.max(maxPos, Math.abs(minNeg));
}

// --- 3. Optimal Approach (Prefix Sum Range Difference) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// Any subarray sum is prefixSum[j] - prefixSum[i].
// The maximum absolute difference is simply max(prefixSum) - min(prefixSum).
export function maxAbsoluteSumOptimal(nums: number[]): number {
  let maxPrefix = 0;
  let minPrefix = 0;
  let currentPrefix = 0;

  for (const x of nums) {
    currentPrefix += x;
    maxPrefix = Math.max(maxPrefix, currentPrefix);
    minPrefix = Math.min(minPrefix, currentPrefix);
  }

  return maxPrefix - minPrefix;
}

// --- Test Verification ---
console.assert(maxAbsoluteSumOptimal([1, -3, 2, 3, -4]) === 5, "Test 1 failed");
console.assert(maxAbsoluteSumOptimal([2, -5, 1, -4, 3, -2]) === 8, "Test 2 failed");
