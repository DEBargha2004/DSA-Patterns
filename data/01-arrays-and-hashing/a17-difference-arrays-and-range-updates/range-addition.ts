/**
 * Problem: Range Addition (LeetCode 370)
 * Difficulty: Medium
 * Pattern: A17 - Difference arrays and range updates
 *
 * You are given an integer length and an array updates where updates[i] = [startIdxi, endIdxi, inci].
 * Return the array after applying all updates.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(k * n) where k is updates.length
// Space Complexity: O(1) excluding output
export function getModifiedArrayBruteForce(length: number, updates: number[][]): number[] {
  const result = new Array<number>(length).fill(0);
  for (const [start, end, inc] of updates) {
    for (let i = start; i <= end; i++) {
      result[i] += inc;
    }
  }
  return result;
}

// --- 2. Optimal Approach (Difference Array + Prefix Sum) ---
// Time Complexity: O(n + k) - each update is O(1), single prefix sum reconstruction pass O(n)
// Space Complexity: O(n)
// Invariant: diff[start] += inc; diff[end + 1] -= inc
export function getModifiedArrayOptimal(length: number, updates: number[][]): number[] {
  const diff = new Array<number>(length + 1).fill(0);

  for (const [start, end, inc] of updates) {
    diff[start] += inc;
    if (end + 1 < length) {
      diff[end + 1] -= inc;
    }
  }

  const result = new Array<number>(length);
  let runningVal = 0;
  for (let i = 0; i < length; i++) {
    runningVal += diff[i];
    result[i] = runningVal;
  }

  return result;
}

// --- Test Verification ---
const updates = [[1, 3, 2], [2, 4, 3], [0, 2, -2]];
console.assert(JSON.stringify(getModifiedArrayOptimal(5, updates)) === JSON.stringify([-2, 0, 3, 5, 3]), "Test failed");
