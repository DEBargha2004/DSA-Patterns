/**
 * Problem: Remove Duplicates from Sorted Array II (LeetCode 80)
 * Difficulty: Medium
 * Pattern: TP4 - Read/write pointers for in-place updates
 *
 * Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place
 * such that each unique element appears at most twice.
 */

// --- Optimal Approach (Read & Write Pointers Checking nums[write - 2]) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function removeDuplicatesII(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let write = 2;
  for (let read = 2; read < nums.length; read++) {
    if (nums[read] !== nums[write - 2]) {
      nums[write++] = nums[read];
    }
  }

  return write;
}

// --- Test Verification ---
const arr = [1, 1, 1, 2, 2, 3];
const len = removeDuplicatesII(arr);
console.assert(len === 5 && arr.slice(0, 5).join(',') === "1,1,2,2,3", "Test failed");
