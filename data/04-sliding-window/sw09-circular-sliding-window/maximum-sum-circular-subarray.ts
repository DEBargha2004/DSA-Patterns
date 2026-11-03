/**
 * Problem: Maximum Sum Circular Subarray (LeetCode 918)
 * Difficulty: Medium
 * Pattern: SW9 - Circular sliding window
 *
 * Find maximum sum of a non-empty subarray in circular array.
 */

// --- Optimal Approach (Kadane Max and Min) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxSubarraySumCircular(nums: number[]): number {
  let totalSum = 0;
  let curMax = 0, maxKadane = nums[0];
  let curMin = 0, minKadane = nums[0];

  for (const x of nums) {
    totalSum += x;
    curMax = Math.max(x, curMax + x);
    maxKadane = Math.max(maxKadane, curMax);

    curMin = Math.min(x, curMin + x);
    minKadane = Math.min(minKadane, curMin);
  }

  return maxKadane < 0 ? maxKadane : Math.max(maxKadane, totalSum - minKadane);
}

// --- Test Verification ---
console.assert(maxSubarraySumCircular([1, -2, 3, -2]) === 3, "Test 1 failed");
console.assert(maxSubarraySumCircular([5, -3, 5]) === 10, "Test 2 failed");
