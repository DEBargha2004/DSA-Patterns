/**
 * Problem: Sort Array By Parity (LeetCode 905)
 * Difficulty: Easy
 * Pattern: TP8 - Partitioning around a condition
 *
 * Move all even integers to the beginning of the array followed by all the odd integers.
 */

// --- Optimal Approach (Two Pointers Colliding) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function sortArrayByParity(nums: number[]): number[] {
  let l = 0, r = nums.length - 1;

  while (l < r) {
    if (nums[l] % 2 > nums[r] % 2) {
      const temp = nums[l];
      nums[l] = nums[r];
      nums[r] = temp;
    }
    if (nums[l] % 2 === 0) l++;
    if (nums[r] % 2 === 1) r--;
  }

  return nums;
}

// --- Test Verification ---
const p = sortArrayByParity([3, 1, 2, 4]);
console.assert(p[0] % 2 === 0 && p[1] % 2 === 0, "Test failed");
