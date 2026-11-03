/**
 * Problem: Find First and Last Position of Element in Sorted Array (LeetCode 34)
 * Difficulty: Medium
 * Pattern: BS2 - Lower and upper bounds
 *
 * Find starting and ending position of a given target value in sorted array in O(log n).
 */

// --- Optimal Approach (Dual Binary Search: Lower & Upper Bounds) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function searchRange(nums: number[], target: number): number[] {
  function findBound(isFirst: boolean): number {
    let left = 0, right = nums.length - 1;
    let bound = -1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) right = mid - 1; // Keep searching left
        else left = mid + 1;          // Keep searching right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return bound;
  }

  return [findBound(true), findBound(false)];
}

// --- Test Verification ---
console.assert(JSON.stringify(searchRange([5, 7, 7, 8, 8, 10], 8)) === JSON.stringify([3, 4]), "Test 1 failed");
console.assert(JSON.stringify(searchRange([5, 7, 7, 8, 8, 10], 6)) === JSON.stringify([-1, -1]), "Test 2 failed");
