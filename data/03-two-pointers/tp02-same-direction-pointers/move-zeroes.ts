/**
 * Problem: Move Zeroes (LeetCode 283)
 * Difficulty: Easy
 * Pattern: TP2 - Same-direction pointers
 *
 * Move all 0's to the end of array maintaining relative order of non-zero elements in-place.
 */

// --- Optimal Approach (Two Pointers Fast & Slow Swap) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function moveZeroes(nums: number[]): void {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      if (slow !== fast) {
        const temp = nums[slow];
        nums[slow] = nums[fast];
        nums[fast] = temp;
      }
      slow++;
    }
  }
}

// --- Test Verification ---
const a = [0, 1, 0, 3, 12];
moveZeroes(a);
console.assert(JSON.stringify(a) === JSON.stringify([1, 3, 12, 0, 0]), "Test failed");
