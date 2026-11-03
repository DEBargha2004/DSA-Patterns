/**
 * Problem: Find All Duplicates in an Array (LeetCode 442)
 * Difficulty: Medium
 * Pattern: A13 - Cyclic placement and index mapping
 *
 * Given an integer array nums of length n where all the integers are in the range [1, n]
 * and each integer appears once or twice, return an array of all the integers that appear twice.
 * Must run in O(n) time and use O(1) extra space.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1) excluding output
export function findDuplicatesBruteForce(nums: number[]): number[] {
  const duplicates: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j] && !duplicates.includes(nums[i])) {
        duplicates.push(nums[i]);
      }
    }
  }
  return duplicates;
}

// --- 2. Optimal Approach (In-Place Sign Negation Index Mapping) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1) extra space
// Since elements are 1..n, treat Math.abs(x) - 1 as index. Negate value at that index.
// If already negative, x is a duplicate!
export function findDuplicatesOptimal(nums: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const targetIdx = Math.abs(nums[i]) - 1;
    if (nums[targetIdx] < 0) {
      result.push(targetIdx + 1);
    } else {
      nums[targetIdx] = -nums[targetIdx];
    }
  }

  return result;
}

// --- Test Verification ---
const input = [4, 3, 2, 7, 8, 2, 3, 1];
const dups = findDuplicatesOptimal(input);
console.assert(JSON.stringify(dups.sort((a, b) => a - b)) === JSON.stringify([2, 3]), "Test failed");
