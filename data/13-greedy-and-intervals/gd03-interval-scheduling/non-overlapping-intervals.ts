/**
 * Pattern: Interval scheduling
 * Problem: Non-overlapping Intervals (LeetCode 435)
 *
 * Given an array of intervals intervals where intervals[i] = [start_i, end_i],
 * return the minimum number of intervals you need to remove to make the rest non-overlapping.
 */

// Brute Force: DP (Longest Non-Overlapping Chain - LIS variation)
// Time: O(N^2), Space: O(N)
export function eraseOverlapIntervalsDP(intervals: number[][]): number {
  const n = intervals.length;
  if (n <= 1) return 0;
  intervals.sort((a, b) => a[0] - b[0]);

  const dp = new Array(n).fill(1); // max compatible intervals ending at i

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (intervals[j][1] <= intervals[i][0]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  const maxCompatible = Math.max(...dp);
  return n - maxCompatible;
}

// Optimal: Greedy Interval Scheduling (Earliest End Time)
// Invariant: Selecting the interval with the earliest end time leaves maximum room for future intervals.
// Time: O(N log N), Space: O(1) auxiliary
export function eraseOverlapIntervalsOptimal(intervals: number[][]): number {
  if (intervals.length <= 1) return 0;
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time

  let removedCount = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      // Overlap: must remove current interval
      removedCount++;
    } else {
      // Non-overlapping: update prevEnd
      prevEnd = intervals[i][1];
    }
  }

  return removedCount;
}

// Test cases
const intv = [[1, 2], [2, 3], [3, 4], [1, 3]];
if (eraseOverlapIntervalsDP(intv) !== 1 || eraseOverlapIntervalsOptimal(intv) !== 1) {
  throw new Error("Expected 1 interval removed");
}
console.log("Non-overlapping Intervals passed!");
