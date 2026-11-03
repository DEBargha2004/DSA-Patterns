/**
 * Problem: Minimum Size Subarray Sum (LeetCode 209)
 * Difficulty: Medium
 * Pattern: SW2 - Variable-size window
 *
 * Return minimal length of contiguous subarray of which sum >= target. If none, return 0.
 */

// --- Optimal Approach (Variable Sliding Window Contraction) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

// --- Test Verification ---
console.assert(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]) === 2, "Test 1 failed");
console.assert(minSubArrayLen(4, [1, 4, 4]) === 1, "Test 2 failed");
console.assert(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]) === 0, "Test 3 failed");
