/**
 * Problem: Replace Elements with Greatest Element on Right Side (LeetCode 1299)
 * Difficulty: Easy
 * Pattern: A1 - Basic traversal and in-place modification
 *
 * Given an array arr, replace every element in that array with the greatest element
 * among the elements to its right, and replace the last element with -1.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - scans the suffix for every index
// Space Complexity: O(1)
export function replaceElementsBruteForce(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let maxRight = arr[i + 1];
    for (let j = i + 2; j < n; j++) {
      if (arr[j] > maxRight) {
        maxRight = arr[j];
      }
    }
    arr[i] = maxRight;
  }
  if (n > 0) arr[n - 1] = -1;
  return arr;
}

// --- 2. Optimal Approach (Reverse Traversal with Running Max) ---
// Time Complexity: O(n) - single pass backwards
// Space Complexity: O(1) - in-place
export function replaceElementsOptimal(arr: number[]): number[] {
  let maxRight = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    const current = arr[i];
    arr[i] = maxRight;
    if (current > maxRight) {
      maxRight = current;
    }
  }
  return arr;
}

// --- Test Verification ---
const testArr = [17, 18, 5, 4, 6, 1];
replaceElementsOptimal(testArr);
console.assert(JSON.stringify(testArr) === JSON.stringify([18, 6, 6, 6, 1, -1]), `Test Failed`);
