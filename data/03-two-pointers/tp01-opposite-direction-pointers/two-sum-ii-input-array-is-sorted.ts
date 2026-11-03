/**
 * Problem: Two Sum II - Input Array Is Sorted (LeetCode 167)
 * Difficulty: Medium
 * Pattern: TP1 - Opposite-direction pointers
 *
 * Given a 1-indexed array of integers numbers sorted in non-decreasing order,
 * find two numbers that add up to target.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function twoSumSortedBruteForce(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) return [i + 1, j + 1];
    }
  }
  return [];
}

// --- 2. Optimal Approach (Opposite-Direction Pointers) ---
// Time Complexity: O(n) - pointers collide in single pass
// Space Complexity: O(1)
export function twoSumSortedOptimal(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }

  return [];
}

// --- Test Verification ---
console.assert(JSON.stringify(twoSumSortedOptimal([2, 7, 11, 15], 9)) === JSON.stringify([1, 2]), "Test failed");
