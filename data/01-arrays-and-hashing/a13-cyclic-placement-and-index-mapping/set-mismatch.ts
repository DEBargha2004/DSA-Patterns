/**
 * Problem: Set Mismatch (LeetCode 645)
 * Difficulty: Easy
 * Pattern: A13 - Cyclic placement and index mapping
 *
 * You have a set of integers from 1 to n. Due to an error, one number was duplicated
 * and another missing. Find the duplicate and missing numbers. Return [duplicate, missing].
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function findErrorNumsBruteForce(nums: number[]): number[] {
  let dup = -1;
  let missing = -1;
  for (let i = 1; i <= nums.length; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === i) count++;
    }
    if (count === 2) dup = i;
    else if (count === 0) missing = i;
  }
  return [dup, missing];
}

// --- 2. Optimal Approach (Cyclic Sort Placement) ---
// Time Complexity: O(n) - each element placed at nums[i] - 1
// Space Complexity: O(1)
export function findErrorNumsOptimal(nums: number[]): number[] {
  let i = 0;
  while (i < nums.length) {
    const correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      const temp = nums[correctIdx];
      nums[correctIdx] = nums[i];
      nums[i] = temp;
    } else {
      i++;
    }
  }

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      return [nums[j], j + 1];
    }
  }

  return [];
}

// --- Test Verification ---
console.assert(JSON.stringify(findErrorNumsOptimal([1, 2, 2, 4])) === JSON.stringify([2, 3]), "Test failed");
