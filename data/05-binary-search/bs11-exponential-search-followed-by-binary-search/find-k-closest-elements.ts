/**
 * Problem: Find K Closest Elements (LeetCode 658)
 * Difficulty: Medium
 * Pattern: BS11 - Binary search over window left bounds
 *
 * Find k closest integers to x in sorted array nums.
 */

// --- Optimal Approach (Binary Search on Left Bound of Window of Size K) ---
// Time Complexity: O(log(n - k))
// Space Complexity: O(1) auxiliary
export function findClosestElements(nums: number[], k: number, x: number): number[] {
  let left = 0;
  let right = nums.length - k;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (x - nums[mid] > nums[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums.slice(left, left + k);
}

// --- Test Verification ---
console.assert(JSON.stringify(findClosestElements([1, 2, 3, 4, 5], 4, 3)) === JSON.stringify([1, 2, 3, 4]), "Test 1 failed");
console.assert(JSON.stringify(findClosestElements([1, 2, 3, 4, 5], 4, -1)) === JSON.stringify([1, 2, 3, 4]), "Test 2 failed");
