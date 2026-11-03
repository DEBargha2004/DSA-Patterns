/**
 * Problem: First Missing Positive (LeetCode 41)
 * Difficulty: Hard
 * Pattern: A13 - Cyclic placement and index mapping
 *
 * Given an unsorted integer array nums, return the smallest missing positive integer.
 * Must run in O(n) time and use O(1) auxiliary space.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - check every positive integer 1, 2, 3...
// Space Complexity: O(1)
export function firstMissingPositiveBruteForce(nums: number[]): number {
  let target = 1;
  while (true) {
    if (!nums.includes(target)) {
      return target;
    }
    target++;
  }
}

// --- 2. Better Approach (Hash Set) ---
// Time Complexity: O(n)
// Space Complexity: O(n) - violates O(1) extra space constraint
export function firstMissingPositiveSet(nums: number[]): number {
  const set = new Set<number>(nums);
  let target = 1;
  while (set.has(target)) {
    target++;
  }
  return target;
}

// --- 3. Optimal Approach (Cyclic Sort / Index Placement) ---
// Time Complexity: O(n) - each element swapped at most twice into its correct bucket nums[i] == i + 1
// Space Complexity: O(1)
export function firstMissingPositiveOptimal(nums: number[]): number {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    // Place nums[i] at index nums[i] - 1 if it is in range [1, n]
    while (
      nums[i] > 0 &&
      nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      const correctIdx = nums[i] - 1;
      const temp = nums[correctIdx];
      nums[correctIdx] = nums[i];
      nums[i] = temp;
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return n + 1;
}

// --- Test Verification ---
console.assert(firstMissingPositiveOptimal([1, 2, 0]) === 3, "Test 1 failed");
console.assert(firstMissingPositiveOptimal([3, 4, -1, 1]) === 2, "Test 2 failed");
console.assert(firstMissingPositiveOptimal([7, 8, 9, 11, 12]) === 1, "Test 3 failed");
