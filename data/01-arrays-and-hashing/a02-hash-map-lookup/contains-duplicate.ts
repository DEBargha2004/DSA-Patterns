/**
 * Problem: Contains Duplicate (LeetCode 217)
 * Difficulty: Easy
 * Pattern: A2 - Hash map/set lookup
 *
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - checks every pair
// Space Complexity: O(1)
export function containsDuplicateBruteForce(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// --- 2. Better Approach (Sorting) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1) or O(n) depending on sort
export function containsDuplicateSorting(nums: number[]): boolean {
  const sorted = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) return true;
  }
  return false;
}

// --- 3. Optimal Approach (Hash Set Lookup) ---
// Time Complexity: O(n) - average O(1) insertion & lookup
// Space Complexity: O(n)
export function containsDuplicateOptimal(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

// --- Test Verification ---
console.assert(containsDuplicateOptimal([1, 2, 3, 1]) === true, "Test 1 failed");
console.assert(containsDuplicateOptimal([1, 2, 3, 4]) === false, "Test 2 failed");
