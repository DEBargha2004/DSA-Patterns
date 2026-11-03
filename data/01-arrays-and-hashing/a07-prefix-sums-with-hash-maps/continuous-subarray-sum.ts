/**
 * Problem: Continuous Subarray Sum (LeetCode 523)
 * Difficulty: Medium
 * Pattern: A7 - Prefix sums with hash maps
 *
 * Given an integer array nums and an integer k, return true if nums has a good subarray:
 * length at least 2 and sum is a multiple of k.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function checkSubarraySumBruteForce(nums: number[], k: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (k === 0 ? sum === 0 : sum % k === 0) return true;
    }
  }
  return false;
}

// --- 2. Optimal Approach (Prefix Sum Modulo + Earliest Index Map) ---
// Time Complexity: O(n)
// Space Complexity: O(min(n, k))
// If prefixSum[j] % k == prefixSum[i] % k and (j - i) >= 2, the subarray sum is a multiple of k.
export function checkSubarraySumOptimal(nums: number[], k: number): boolean {
  let runningSum = 0;
  const modMap = new Map<number, number>();
  // Base case: modulo 0 at index -1
  modMap.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    runningSum += nums[i];
    const remainder = k === 0 ? runningSum : ((runningSum % k) + k) % k;

    if (modMap.has(remainder)) {
      if (i - modMap.get(remainder)! >= 2) {
        return true;
      }
    } else {
      modMap.set(remainder, i);
    }
  }

  return false;
}

// --- Test Verification ---
console.assert(checkSubarraySumOptimal([23, 2, 4, 6, 7], 6) === true, "Test 1 failed");
console.assert(checkSubarraySumOptimal([23, 2, 6, 4, 7], 6) === true, "Test 2 failed");
console.assert(checkSubarraySumOptimal([23, 2, 6, 4, 7], 13) === false, "Test 3 failed");
