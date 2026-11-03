/**
 * Problem: Remove Element (LeetCode 27)
 * Difficulty: Easy
 * Pattern: TP4 - Read/write pointers for in-place updates
 *
 * Remove all occurrences of val in nums in-place, returning new count k.
 */

// --- Optimal Approach (Read/Write Two Pointers) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function removeElement(nums: number[], val: number): number {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== val) {
      nums[write++] = nums[read];
    }
  }
  return write;
}

// --- Test Verification ---
const a = [3, 2, 2, 3];
const k = removeElement(a, 3);
console.assert(k === 2 && a.slice(0, 2).join(',') === '2,2', "Test failed");
