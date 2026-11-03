/**
 * Problem: Find Minimum in Rotated Sorted Array (LeetCode 153)
 * Difficulty: Medium
 * Pattern: BS4 - Search in rotated sorted array
 *
 * Find minimum element in rotated sorted array with distinct values in O(log n).
 */

// --- Optimal Approach (Compare mid with right) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[right]) {
      // Minimum is strictly in right half
      left = mid + 1;
    } else {
      // Minimum is at mid or in left half
      right = mid;
    }
  }

  return nums[left];
}

// --- Test Verification ---
console.assert(findMin([3, 4, 5, 1, 2]) === 1, "Test 1 failed");
console.assert(findMin([4, 5, 6, 7, 0, 1, 2]) === 0, "Test 2 failed");
console.assert(findMin([11, 13, 15, 17]) === 11, "Test 3 failed");
