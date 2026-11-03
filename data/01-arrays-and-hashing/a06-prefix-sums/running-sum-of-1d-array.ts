/**
 * Problem: Running Sum of 1d Array (LeetCode 1480)
 * Difficulty: Easy
 * Pattern: A6 - Prefix sums
 *
 * Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
 * Return the running sum of nums.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - recalculate sum from index 0 to i
// Space Complexity: O(n) for result
export function runningSumBruteForce(nums: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      sum += nums[j];
    }
    result.push(sum);
  }
  return result;
}

// --- 2. Optimal Approach (Single-Pass Accumulation) ---
// Time Complexity: O(n)
// Space Complexity: O(1) extra space if modifying in-place, or O(n) for new array
export function runningSumOptimal(nums: number[]): number[] {
  const result = new Array<number>(nums.length);
  let currentSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    result[i] = currentSum;
  }
  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(runningSumOptimal([1, 2, 3, 4])) === JSON.stringify([1, 3, 6, 10]), "Test failed");
