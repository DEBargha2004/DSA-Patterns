/**
 * Problem: Search in Rotated Sorted Array (LeetCode 33)
 * Difficulty: Medium
 * Pattern: BS4 - Search in rotated sorted array
 *
 * Given array sorted in ascending order with distinct values rotated at unknown pivot. Find target index in O(log n).
 */

// --- Optimal Approach (Identify Sorted Half Invariant) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function searchRotated(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    // Left half is normally sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is normally sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(searchRotated([4, 5, 6, 7, 0, 1, 2], 0) === 4, "Test 1 failed");
console.assert(searchRotated([4, 5, 6, 7, 0, 1, 2], 3) === -1, "Test 2 failed");
console.assert(searchRotated([1], 0) === -1, "Test 3 failed");
