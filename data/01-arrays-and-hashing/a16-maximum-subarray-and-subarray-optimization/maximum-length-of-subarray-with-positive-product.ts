/**
 * Problem: Maximum Length of Subarray With Positive Product (LeetCode 1567)
 * Difficulty: Medium
 * Pattern: A16 - Maximum subarray and subarray optimization
 *
 * Given an array of integers nums, find the maximum length of a subarray where the product of all its elements is positive.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function getMaxLenBruteForce(nums: number[]): number {
  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    let negCount = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) break;
      if (nums[j] < 0) negCount++;
      if (negCount % 2 === 0) {
        maxLen = Math.max(maxLen, j - i + 1);
      }
    }
  }
  return maxLen;
}

// --- 2. Optimal Approach (Dynamic Programming Tracking Pos & Neg Lengths) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
export function getMaxLenOptimal(nums: number[]): number {
  let posLen = 0;
  let negLen = 0;
  let maxLen = 0;

  for (const x of nums) {
    if (x === 0) {
      posLen = 0;
      negLen = 0;
    } else if (x > 0) {
      posLen = posLen + 1;
      negLen = negLen > 0 ? negLen + 1 : 0;
    } else {
      // x < 0: swapping positive and negative product lengths
      const prevPos = posLen;
      posLen = negLen > 0 ? negLen + 1 : 0;
      negLen = prevPos + 1;
    }
    maxLen = Math.max(maxLen, posLen);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(getMaxLenOptimal([1, -2, -3, 4]) === 4, "Test 1 failed");
console.assert(getMaxLenOptimal([0, 1, -2, -3, -4]) === 3, "Test 2 failed");
console.assert(getMaxLenOptimal([-1, -2, -3, 0, 1]) === 2, "Test 3 failed");
