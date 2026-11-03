/**
 * Problem: Find Peak Element (LeetCode 162)
 * Difficulty: Medium
 * Pattern: BS5 - Find a peak or turning point
 *
 * A peak element is an element strictly greater than its neighbors. Find a peak and return its index in O(log n).
 */

// --- Optimal Approach (Binary Search Climbing Upwards Slope) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < nums[mid + 1]) {
      // Slope rises to the right: peak must exist in right half
      left = mid + 1;
    } else {
      // Slope descends: peak is at mid or in left half
      right = mid;
    }
  }

  return left;
}

// --- Test Verification ---
console.assert(findPeakElement([1, 2, 3, 1]) === 2, "Test 1 failed");
const p = findPeakElement([1, 2, 1, 3, 5, 6, 4]);
console.assert(p === 1 || p === 5, "Test 2 failed");
