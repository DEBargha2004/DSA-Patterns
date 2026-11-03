/**
 * Problem: Remove Element (LeetCode 27)
 * Difficulty: Easy
 * Pattern: A1 - Basic traversal and in-place modification
 *
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
 * Return the number of elements in nums which are not equal to val.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n)
// Space Complexity: O(n) - copies to extra array
export function removeElementBruteForce(nums: number[], val: number): number {
  const filtered = nums.filter((x) => x !== val);
  for (let i = 0; i < filtered.length; i++) {
    nums[i] = filtered[i];
  }
  return filtered.length;
}

// --- 2. Optimal Approach (Two Pointers - Slow & Fast) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function removeElementOptimal(nums: number[], val: number): number {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}

// --- 3. Optimal Alternative (Swap with End Pointer) ---
// Time Complexity: O(n) - performs fewer element assignments when val is rare
// Space Complexity: O(1)
export function removeElementSwapWithEnd(nums: number[], val: number): number {
  let i = 0;
  let n = nums.length;
  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1];
      n--;
    } else {
      i++;
    }
  }
  return n;
}

// --- Test Verification ---
const arr1 = [3, 2, 2, 3];
const k1 = removeElementOptimal(arr1, 3);
console.assert(k1 === 2 && arr1.slice(0, 2).sort().join(',') === '2,2', `Test 1 Failed: k=${k1}`);
