/**
 * Problem: Find All Numbers Disappeared in an Array (LeetCode 448)
 * Difficulty: Easy
 * Pattern: A3 - Frequency counting
 *
 * Given an array nums of n integers where nums[i] is in the range [1, n],
 * return an array of all the integers in the range [1, n] that do not appear in nums.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - check presence of each number 1..n
// Space Complexity: O(1) excluding output
export function findDisappearedNumbersBruteForce(nums: number[]): number[] {
  const result: number[] = [];
  const n = nums.length;
  for (let val = 1; val <= n; val++) {
    if (!nums.includes(val)) {
      result.push(val);
    }
  }
  return result;
}

// --- 2. Better Approach (Hash Set / Frequency Array) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function findDisappearedNumbersBetter(nums: number[]): number[] {
  const present = new Set<number>(nums);
  const result: number[] = [];
  for (let val = 1; val <= nums.length; val++) {
    if (!present.has(val)) {
      result.push(val);
    }
  }
  return result;
}

// --- 3. Optimal Approach (In-Place Sign Negation Index Mapping) ---
// Time Complexity: O(n)
// Space Complexity: O(1) extra space
// Negates the value at index Math.abs(num) - 1 to mark presence.
export function findDisappearedNumbersOptimal(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    const targetIdx = Math.abs(nums[i]) - 1;
    if (nums[targetIdx] > 0) {
      nums[targetIdx] = -nums[targetIdx];
    }
  }

  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }

  return result;
}

// --- Test Verification ---
const input = [4, 3, 2, 7, 8, 2, 3, 1];
const missing = findDisappearedNumbersOptimal(input);
console.assert(JSON.stringify(missing) === JSON.stringify([5, 6]), "Test failed");
