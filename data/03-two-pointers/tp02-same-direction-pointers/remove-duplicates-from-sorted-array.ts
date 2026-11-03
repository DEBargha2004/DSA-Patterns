/**
 * Problem: Remove Duplicates from Sorted Array (LeetCode 26)
 * Difficulty: Easy
 * Pattern: TP2 - Same-direction pointers
 *
 * Given an integer array nums sorted in non-decreasing order, remove duplicates in-place.
 */

// --- Optimal Approach (Slow & Fast Same-Direction Pointers) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;
}

// --- Test Verification ---
const arr = [1, 1, 2];
const k = removeDuplicates(arr);
console.assert(k === 2 && arr.slice(0, 2).join(',') === '1,2', "Test failed");
