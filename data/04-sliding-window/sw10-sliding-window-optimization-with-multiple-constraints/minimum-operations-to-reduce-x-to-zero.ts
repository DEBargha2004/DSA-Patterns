/**
 * Problem: Minimum Operations to Reduce X to Zero (LeetCode 1658)
 * Difficulty: Medium
 * Pattern: SW10 - Sliding-window optimization with multiple constraints
 *
 * Remove elements from ends summing to x. Min operations = Max length subarray summing to (totalSum - x).
 */

// --- Optimal Approach (Inverted Target Sliding Window) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function minOperations(nums: number[], x: number): number {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  const target = totalSum - x;
  if (target < 0) return -1;
  if (target === 0) return nums.length;

  let left = 0;
  let currentSum = 0;
  let maxLen = -1;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    while (currentSum > target && left <= right) {
      currentSum -= nums[left++];
    }

    if (currentSum === target) {
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }

  return maxLen === -1 ? -1 : nums.length - maxLen;
}

// --- Test Verification ---
console.assert(minOperations([1, 1, 4, 2, 3], 5) === 2, "Test 1 failed");
console.assert(minOperations([5, 6, 7, 8, 9], 4) === -1, "Test 2 failed");
console.assert(minOperations([3, 2, 20, 1, 1, 3], 10) === 5, "Test 3 failed");
