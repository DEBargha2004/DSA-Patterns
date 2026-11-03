/**
 * Problem: Maximum Erasure Value (LeetCode 1695)
 * Difficulty: Medium
 * Pattern: SW3 - Longest valid window
 *
 * Return maximum score (sum) of subarray having unique elements.
 */

// --- Optimal Approach (Sliding Window with Unique Set and Running Sum) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function maximumUniqueSubarray(nums: number[]): number {
  const seen = new Set<number>();
  let left = 0;
  let currentSum = 0;
  let maxSum = 0;

  for (let right = 0; right < nums.length; right++) {
    while (seen.has(nums[right])) {
      seen.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }

    seen.add(nums[right]);
    currentSum += nums[right];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// --- Test Verification ---
console.assert(maximumUniqueSubarray([4, 2, 4, 5, 6]) === 17, "Test 1 failed");
console.assert(maximumUniqueSubarray([5, 2, 1, 2, 5, 2, 1, 2, 5]) === 8, "Test 2 failed");
