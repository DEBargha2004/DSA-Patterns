/**
 * Problem: Sort Colors (LeetCode 75)
 * Difficulty: Medium
 * Pattern: TP8 - Partitioning around a condition
 *
 * Sort array of 0s, 1s, and 2s in-place (Dutch National Flag).
 */

// --- Optimal Approach (Dutch National Flag Algorithm) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function sortColors(nums: number[]): void {
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}

// --- Test Verification ---
const c = [2, 0, 2, 1, 1, 0];
sortColors(c);
console.assert(JSON.stringify(c) === JSON.stringify([0, 0, 1, 1, 2, 2]), "Test failed");
