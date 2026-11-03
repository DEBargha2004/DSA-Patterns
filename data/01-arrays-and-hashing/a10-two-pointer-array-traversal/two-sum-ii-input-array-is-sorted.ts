/**
 * Problem: Two Sum II - Input Array Is Sorted (LeetCode 167)
 * Difficulty: Medium
 * Pattern: A10 - Two-pointer array traversal
 *
 * Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
 * find two numbers such that they add up to a specific target number. Return [index1, index2].
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function twoSumSortedBruteForce(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1];
      }
    }
  }
  return [];
}

// --- 2. Better Approach (Binary Search) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1)
export function twoSumSortedBinarySearch(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];
    let left = i + 1;
    let right = numbers.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (numbers[mid] === complement) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] < complement) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return [];
}

// --- 3. Optimal Approach (Two Pointers Colliding) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
export function twoSumSortedOptimal(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

// --- Test Verification ---
console.assert(JSON.stringify(twoSumSortedOptimal([2, 7, 11, 15], 9)) === JSON.stringify([1, 2]), "Test failed");
