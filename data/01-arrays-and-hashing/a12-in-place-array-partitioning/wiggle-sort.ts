/**
 * Problem: Wiggle Sort (LeetCode 280)
 * Difficulty: Medium
 * Pattern: A12 - In-place array partitioning
 *
 * Given an integer array nums, reorder it such that:
 * nums[0] <= nums[1] >= nums[2] <= nums[3]...
 */

// --- 1. Brute Force Approach (Sort and Interleave) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function wiggleSortSort(nums: number[]): void {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length - 1; i += 2) {
    [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
  }
}

// --- 2. Optimal Approach (Single-Pass Greedy Local Swaps) ---
// Time Complexity: O(n) - single pass, inspect adjacent condition
// Space Complexity: O(1) in-place
// Property:
// If i is odd, nums[i] >= nums[i-1]
// If i is even, nums[i] <= nums[i-1]
export function wiggleSortOptimal(nums: number[]): void {
  for (let i = 1; i < nums.length; i++) {
    if ((i % 2 === 1 && nums[i] < nums[i - 1]) ||
        (i % 2 === 0 && nums[i] > nums[i - 1])) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    }
  }
}

// --- Test Verification ---
const arr = [3, 5, 2, 1, 6, 4];
wiggleSortOptimal(arr);
let valid = true;
for (let i = 1; i < arr.length; i++) {
  if (i % 2 === 1 ? arr[i] < arr[i - 1] : arr[i] > arr[i - 1]) valid = false;
}
console.assert(valid, "Test failed: arr is not wiggled");
