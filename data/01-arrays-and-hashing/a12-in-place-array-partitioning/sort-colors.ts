/**
 * Problem: Sort Colors (LeetCode 75)
 * Difficulty: Medium
 * Pattern: A12 - In-place array partitioning
 *
 * Given an array nums with n objects colored red, white, or blue (0, 1, 2),
 * sort them in-place so that objects of the same color are adjacent.
 */

// --- 1. Brute Force Approach (Built-in Sort) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1)
export function sortColorsSort(nums: number[]): void {
  nums.sort((a, b) => a - b);
}

// --- 2. Better Approach (Two-Pass Counting Sort) ---
// Time Complexity: O(n) - two passes
// Space Complexity: O(1)
export function sortColorsCounting(nums: number[]): void {
  const counts = [0, 0, 0];
  for (const num of nums) counts[num]++;

  let idx = 0;
  for (let color = 0; color < 3; color++) {
    for (let c = 0; c < counts[color]; c++) {
      nums[idx++] = color;
    }
  }
}

// --- 3. Optimal Approach (One-Pass Dutch National Flag Algorithm) ---
// Time Complexity: O(n) - single pass, 3 pointers
// Space Complexity: O(1)
// Invariant:
// nums[0..low-1] are 0s
// nums[low..mid-1] are 1s
// nums[high+1..n-1] are 2s
export function sortColorsOptimal(nums: number[]): void {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

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
const colors = [2, 0, 2, 1, 1, 0];
sortColorsOptimal(colors);
console.assert(JSON.stringify(colors) === JSON.stringify([0, 0, 1, 1, 2, 2]), "Test failed");
