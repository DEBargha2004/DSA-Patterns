/**
 * Problem: Maximum Sum Circular Subarray (LeetCode 918)
 * Difficulty: Medium
 * Pattern: A9 - Kadane's algorithm
 *
 * Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - evaluates all contiguous and circular subarrays
// Space Complexity: O(1)
export function maxSubarraySumCircularBruteForce(nums: number[]): number {
  const n = nums.length;
  let maxSum = nums[0];

  for (let i = 0; i < n; i++) {
    let currentSum = 0;
    for (let len = 1; len <= n; len++) {
      currentSum += nums[(i + len - 1) % n];
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}

// --- 2. Optimal Approach (Kadane's Max & Min Dual Invariant) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// The maximum circular subarray is either:
// 1. A standard non-circular subarray: maxKadane
// 2. A circular subarray wrapping around: totalSum - minKadane (unless all numbers are negative)
export function maxSubarraySumCircularOptimal(nums: number[]): number {
  let totalSum = 0;
  let curMax = 0;
  let maxKadane = nums[0];
  let curMin = 0;
  let minKadane = nums[0];

  for (const num of nums) {
    totalSum += num;

    curMax = Math.max(num, curMax + num);
    maxKadane = Math.max(maxKadane, curMax);

    curMin = Math.min(num, curMin + num);
    minKadane = Math.min(minKadane, curMin);
  }

  // If all numbers are negative, totalSum - minKadane = 0 (empty subarray, invalid)
  if (maxKadane < 0) {
    return maxKadane;
  }

  return Math.max(maxKadane, totalSum - minKadane);
}

// --- Test Verification ---
console.assert(maxSubarraySumCircularOptimal([1, -2, 3, -2]) === 3, "Test 1 failed");
console.assert(maxSubarraySumCircularOptimal([5, -3, 5]) === 10, "Test 2 failed");
console.assert(maxSubarraySumCircularOptimal([-3, -2, -3]) === -2, "Test 3 failed");
