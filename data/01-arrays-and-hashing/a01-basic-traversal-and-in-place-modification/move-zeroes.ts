/**
 * Problem: Move Zeroes (LeetCode 283)
 * Difficulty: Easy
 * Pattern: A1 - Basic traversal and in-place modification
 *
 * Given an integer array nums, move all 0's to the end of it while maintaining
 * the relative order of the non-zero elements.
 * Must be done in-place without making a copy of the array.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n)
// Space Complexity: O(n) - copies to auxiliary array (violates in-place requirement)
export function moveZeroesBruteForce(nums: number[]): void {
  const result: number[] = new Array(nums.length).fill(0);
  let nonZeroIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      result[nonZeroIdx++] = nums[i];
    }
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
}

// --- 2. Better Approach (Two-Pass Overwrite & Fill) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
// Shifts non-zeros to the front in pass 1, then fills the remaining positions with zeros in pass 2.
export function moveZeroesBetter(nums: number[]): void {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
}

// --- 3. Optimal Approach (Single-Pass Two-Pointer Swap) ---
// Time Complexity: O(n) - exactly one pass, minimum writes when already sorted
// Space Complexity: O(1)
// Maintains the invariant: all elements before lastNonZeroFoundAt are non-zero.
export function moveZeroesOptimal(nums: number[]): void {
  let lastNonZeroFoundAt = 0;
  for (let cur = 0; cur < nums.length; cur++) {
    if (nums[cur] !== 0) {
      if (cur !== lastNonZeroFoundAt) {
        const temp = nums[lastNonZeroFoundAt];
        nums[lastNonZeroFoundAt] = nums[cur];
        nums[cur] = temp;
      }
      lastNonZeroFoundAt++;
    }
  }
}

// --- Test Verification ---
const testArr1 = [0, 1, 0, 3, 12];
moveZeroesOptimal(testArr1);
console.assert(JSON.stringify(testArr1) === JSON.stringify([1, 3, 12, 0, 0]), `Test 1 Failed: ${testArr1}`);

const testArr2 = [0];
moveZeroesOptimal(testArr2);
console.assert(JSON.stringify(testArr2) === JSON.stringify([0]), `Test 2 Failed: ${testArr2}`);
