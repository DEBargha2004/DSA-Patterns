/**
 * Problem: Max Consecutive Ones III (LeetCode 1004)
 * Difficulty: Medium
 * Pattern: SW2 - Variable-size window
 *
 * Given a binary array nums and an integer k, return the maximum number of consecutive 1's
 * in the array if you can flip at most k 0's.
 */

// --- Optimal Approach (Sliding Window with At Most K Zeroes) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function longestOnes(nums: number[], k: number): number {
  let left = 0;
  let zeroes = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroes++;

    while (zeroes > k) {
      if (nums[left] === 0) zeroes--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2) === 6, "Test 1 failed");
console.assert(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3) === 10, "Test 2 failed");
