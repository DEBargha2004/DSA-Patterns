/**
 * Problem: Number of Subarrays with Bounded Maximum (LeetCode 795)
 * Difficulty: Medium
 * Pattern: A22 - Advanced subarray counting
 *
 * Given an integer array nums and two integers left and right, return the number of contiguous
 * non-empty subarrays such that the value of the maximum array element in that subarray is in the range [left, right].
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function numSubarrayBoundedMaxBruteForce(nums: number[], left: number, right: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let curMax = -Infinity;
    for (let j = i; j < nums.length; j++) {
      curMax = Math.max(curMax, nums[j]);
      if (curMax >= left && curMax <= right) {
        count++;
      } else if (curMax > right) {
        break;
      }
    }
  }
  return count;
}

// --- 2. Optimal Approach (Count(max <= right) - Count(max <= left - 1)) ---
// Time Complexity: O(n) - two linear passes
// Space Complexity: O(1)
// Any subarray with all elements <= bound is valid.
export function numSubarrayBoundedMaxOptimal(nums: number[], left: number, right: number): number {
  function countMaxAtMost(bound: number): number {
    let count = 0;
    let currentLen = 0;

    for (const num of nums) {
      if (num <= bound) {
        currentLen++;
        count += currentLen;
      } else {
        currentLen = 0;
      }
    }

    return count;
  }

  return countMaxAtMost(right) - countMaxAtMost(left - 1);
}

// --- Test Verification ---
console.assert(numSubarrayBoundedMaxOptimal([2, 1, 4, 3], 2, 3) === 3, "Test 1 failed");
console.assert(numSubarrayBoundedMaxOptimal([2, 9, 2, 5, 6], 2, 8) === 7, "Test 2 failed");
