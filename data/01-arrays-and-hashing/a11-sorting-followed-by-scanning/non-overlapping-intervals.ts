/**
 * Problem: Non-overlapping Intervals (LeetCode 435)
 * Difficulty: Medium
 * Pattern: A11 - Sorting followed by scanning
 *
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number
 * of intervals you need to remove to make the rest of the intervals non-overlapping.
 */

// --- 1. Brute Force Approach (Recursive 2^n) ---
// Time Complexity: O(2^n)
// Space Complexity: O(n)
export function eraseOverlapIntervalsBruteForce(intervals: number[][]): number {
  intervals.sort((a, b) => a[0] - b[0]);

  function helper(prevIdx: number, curIdx: number): number {
    if (curIdx === intervals.length) return 0;

    let take = Infinity;
    // Check if curIdx overlaps with prevIdx
    if (prevIdx === -1 || intervals[curIdx][0] >= intervals[prevIdx][1]) {
      take = helper(curIdx, curIdx + 1);
    }
    // Skip curIdx (removing it counts as 1 removal)
    const skip = 1 + helper(prevIdx, curIdx + 1);

    return Math.min(take, skip);
  }

  return helper(-1, 0);
}

// --- 2. Optimal Approach (Sort by End Time + Greedy Scan) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1) or O(log n) for sorting
// Classic interval scheduling: keep the interval that finishes earliest to leave max room for remaining.
export function eraseOverlapIntervalsOptimal(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[1] - b[1]);

  let removals = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      // Overlap detected: remove this interval
      removals++;
    } else {
      // No overlap: update finish boundary
      prevEnd = intervals[i][1];
    }
  }

  return removals;
}

// --- Test Verification ---
console.assert(eraseOverlapIntervalsOptimal([[1, 2], [2, 3], [3, 4], [1, 3]]) === 1, "Test 1 failed");
console.assert(eraseOverlapIntervalsOptimal([[1, 2], [1, 2], [1, 2]]) === 2, "Test 2 failed");
