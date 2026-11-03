/**
 * Problem: Partition Array According to Given Pivot (LeetCode 2161)
 * Difficulty: Medium
 * Pattern: A12 - In-place array partitioning
 *
 * Given a 0-indexed integer array nums and an integer pivot, rearrange nums such that:
 * 1. Every element < pivot appears before every element > pivot.
 * 2. Every element == pivot appears in between.
 * 3. The relative order of elements is preserved.
 */

// --- 1. Brute Force Approach (Three Separate Auxiliary Arrays) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function pivotArrayBruteForce(nums: number[], pivot: number): number[] {
  const less: number[] = [];
  const equal: number[] = [];
  const greater: number[] = [];

  for (const num of nums) {
    if (num < pivot) less.push(num);
    else if (num === pivot) equal.push(num);
    else greater.push(num);
  }

  return [...less, ...equal, ...greater];
}

// --- 2. Optimal Approach (Two Pointers Single Result Array) ---
// Time Complexity: O(n) - two pointers populate from left and right simultaneously
// Space Complexity: O(n) for result array
export function pivotArrayOptimal(nums: number[], pivot: number): number[] {
  const n = nums.length;
  const result = new Array<number>(n);
  let left = 0;
  let right = n - 1;

  // Forward pass for < pivot, backward pass for > pivot
  for (let i = 0, j = n - 1; i < n; i++, j--) {
    if (nums[i] < pivot) {
      result[left++] = nums[i];
    }
    if (nums[j] > pivot) {
      result[right--] = nums[j];
    }
  }

  // Fill in the middle with equal elements
  while (left <= right) {
    result[left++] = pivot;
  }

  return result;
}

// --- Test Verification ---
const res = pivotArrayOptimal([9, 12, 5, 10, 14, 3, 10], 10);
console.assert(JSON.stringify(res) === JSON.stringify([9, 5, 3, 10, 10, 12, 14]), "Test failed");
