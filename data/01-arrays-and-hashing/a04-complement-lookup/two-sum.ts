/**
 * Problem: Two Sum (LeetCode 1)
 * Difficulty: Easy
 * Pattern: A4 - Complement lookup
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target. Each input has exactly one solution.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - check all pairs
// Space Complexity: O(1)
export function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// --- 2. Optimal Approach (One-Pass Hash Map Complement Lookup) ---
// Time Complexity: O(n) - single pass, O(1) average lookup
// Space Complexity: O(n)
export function twoSumOptimal(nums: number[], target: number): number[] {
  const indexMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (indexMap.has(complement)) {
      return [indexMap.get(complement)!, i];
    }
    indexMap.set(nums[i], i);
  }

  return [];
}

// --- Test Verification ---
console.assert(JSON.stringify(twoSumOptimal([2, 7, 11, 15], 9)) === JSON.stringify([0, 1]), "Test 1 failed");
console.assert(JSON.stringify(twoSumOptimal([3, 2, 4], 6)) === JSON.stringify([1, 2]), "Test 2 failed");
