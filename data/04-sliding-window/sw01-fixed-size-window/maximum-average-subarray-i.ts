/**
 * Problem: Maximum Average Subarray I (LeetCode 643)
 * Difficulty: Easy
 * Pattern: SW1 - Fixed-size window
 *
 * Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.
 */

// --- Optimal Approach (Fixed Window Sum Sliding) ---
// Time Complexity: O(n) - compute first window, slide right by adding new and subtracting old
// Space Complexity: O(1)
export function findMaxAverage(nums: number[], k: number): number {
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum / k;
}

// --- Test Verification ---
console.assert(findMaxAverage([1, 12, -5, -6, 50, 3], 4) === 12.75, "Test 1 failed");
console.assert(findMaxAverage([5], 1) === 5.0, "Test 2 failed");
