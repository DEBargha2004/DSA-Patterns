/**
 * Problem: Search Insert Position (LeetCode 35)
 * Difficulty: Easy
 * Pattern: BS1 - Standard binary search / Lower bound
 *
 * Return index if target is found. If not, return index where it would be if it were inserted in order.
 */

// --- Optimal Approach (Lower Bound Binary Search) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return left;
}

// --- Test Verification ---
console.assert(searchInsert([1, 3, 5, 6], 5) === 2, "Test 1 failed");
console.assert(searchInsert([1, 3, 5, 6], 2) === 1, "Test 2 failed");
console.assert(searchInsert([1, 3, 5, 6], 7) === 4, "Test 3 failed");
