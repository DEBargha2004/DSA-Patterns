/**
 * Problem: Binary Search (LeetCode 704)
 * Difficulty: Easy
 * Pattern: BS1 - Standard binary search
 *
 * Search target in sorted array nums. If exists, return index; otherwise -1.
 */

// --- Optimal Approach (Standard Loop Invariant [left, right]) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// --- Test Verification ---
console.assert(search([-1, 0, 3, 5, 9, 12], 9) === 4, "Test 1 failed");
console.assert(search([-1, 0, 3, 5, 9, 12], 2) === -1, "Test 2 failed");
