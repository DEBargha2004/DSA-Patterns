/**
 * Problem: Merge Intervals (LeetCode 56)
 * Difficulty: Medium
 * Pattern: A11 - Sorting followed by scanning
 *
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
 * and return an array of the non-overlapping intervals that cover all the intervals in the input.
 */

// --- 1. Brute Force Approach (Graph-based Connected Components) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
export function mergeIntervalsBruteForce(intervals: number[][]): number[][] {
  const n = intervals.length;
  const merged: boolean[] = new Array(n).fill(false);
  const result: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (merged[i]) continue;
    let [start, end] = intervals[i];
    let changed = true;

    while (changed) {
      changed = false;
      for (let j = 0; j < n; j++) {
        if (!merged[j] && i !== j) {
          const [s2, e2] = intervals[j];
          if (Math.max(start, s2) <= Math.min(end, e2)) {
            start = Math.min(start, s2);
            end = Math.max(end, e2);
            merged[j] = true;
            changed = true;
          }
        }
      }
    }
    result.push([start, end]);
  }

  return result;
}

// --- 2. Optimal Approach (Sort by Start Time + Linear Scan) ---
// Time Complexity: O(n log n) - sorting dominates
// Space Complexity: O(n) for output / sorting
export function mergeIntervalsOptimal(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      // Overlap: extend end of previous interval
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // Disjoint: start new interval
      merged.push(current);
    }
  }

  return merged;
}

// --- Test Verification ---
const input = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.assert(JSON.stringify(mergeIntervalsOptimal(input)) === JSON.stringify([[1, 6], [8, 10], [15, 18]]), "Test failed");
