/**
 * Problem: Shortest Unsorted Continuous Subarray (LeetCode 581)
 * Difficulty: Medium
 * Pattern: SQ5 - Next greater or smaller element
 *
 * Find continuous subarray that, if sorted in ascending order, makes the whole array sorted.
 */

// --- Optimal Approach (Monotonic Scan / Two-pass) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function findUnsortedSubarray(nums: number[]): number {
  const n = nums.length;
  let maxSeen = -Infinity;
  let minSeen = Infinity;
  let right = -1;
  let left = -1;

  for (let i = 0; i < n; i++) {
    maxSeen = Math.max(maxSeen, nums[i]);
    if (nums[i] < maxSeen) {
      right = i;
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    minSeen = Math.min(minSeen, nums[i]);
    if (nums[i] > minSeen) {
      left = i;
    }
  }

  return right === -1 ? 0 : right - left + 1;
}

// --- Test Verification ---
console.assert(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]) === 5, "Test 1 failed");
console.assert(findUnsortedSubarray([1, 2, 3, 4]) === 0, "Test 2 failed");
console.assert(findUnsortedSubarray([1]) === 0, "Test 3 failed");
console.assert(findUnsortedSubarray([1, 3, 2, 2, 2]) === 4, "Test 4 failed");
