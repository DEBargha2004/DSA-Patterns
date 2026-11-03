/**
 * Problem: Maximum Subarray (LeetCode 53)
 * Difficulty: Medium
 * Pattern: DP3 - One-dimensional DP
 *
 * Find contiguous subarray with largest sum (Kadane's 1D DP).
 */

// --- Optimal Approach (Kadane's DP: dp[i] = max(nums[i], dp[i-1] + nums[i])) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// --- Test Verification ---
console.assert(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6, "Test 1 failed");
console.assert(maxSubArray([1]) === 1, "Test 2 failed");
console.assert(maxSubArray([5, 4, -1, 7, 8]) === 23, "Test 3 failed");
