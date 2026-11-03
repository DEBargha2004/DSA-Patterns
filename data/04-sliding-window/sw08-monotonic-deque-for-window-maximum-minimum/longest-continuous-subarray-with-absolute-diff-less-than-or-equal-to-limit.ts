/**
 * Problem: Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit (LeetCode 1438)
 * Difficulty: Medium
 * Pattern: SW8 - Monotonic deque for window maximum/minimum
 *
 * Find length of longest subarray such that max - min <= limit.
 */

// --- Optimal Approach (Two Monotonic Deques for Min and Max) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function longestSubarray(nums: number[], limit: number): number {
  const maxDeque: number[] = [];
  const minDeque: number[] = [];
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    const val = nums[right];

    while (maxDeque.length > 0 && maxDeque[maxDeque.length - 1] < val) maxDeque.pop();
    maxDeque.push(val);

    while (minDeque.length > 0 && minDeque[minDeque.length - 1] > val) minDeque.pop();
    minDeque.push(val);

    while (maxDeque[0] - minDeque[0] > limit) {
      if (maxDeque[0] === nums[left]) maxDeque.shift();
      if (minDeque[0] === nums[left]) minDeque.shift();
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(longestSubarray([8, 2, 4, 7], 4) === 2, "Test 1 failed");
console.assert(longestSubarray([10, 1, 2, 4, 7, 2], 5) === 4, "Test 2 failed");
