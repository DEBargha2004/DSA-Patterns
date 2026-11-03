/**
 * Pattern: Interval merging
 * Problem: Insert Interval (LeetCode 57)
 *
 * Given an array of non-overlapping intervals sorted by start_i, insert newInterval
 * such that intervals is still sorted and non-overlapping.
 */

// Brute Force: Append newInterval and call full mergeIntervals
// Time: O(N log N), Space: O(N)
export function insertIntervalBrute(intervals: number[][], newInterval: number[]): number[][] {
  const list = [...intervals, newInterval];
  list.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [list[0]];
  for (let i = 1; i < list.length; i++) {
    const curr = list[i];
    const prev = merged[merged.length - 1];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}

// Optimal: Linear Scan with 3 Stages (Before overlap, During overlap, After overlap)
// Time: O(N), Space: O(N)
export function insertIntervalOptimal(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let i = 0;
  const n = intervals.length;

  // 1. Add all intervals ending before newInterval starts
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // 2. Merge all overlapping intervals with newInterval
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // 3. Add all remaining intervals starting after newInterval ends
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// Test cases
const ins1 = insertIntervalBrute([[1, 3], [6, 9]], [2, 5]);
const ins2 = insertIntervalOptimal([[1, 3], [6, 9]], [2, 5]);
if (JSON.stringify(ins1) !== JSON.stringify(ins2) || ins2.length !== 2 || ins2[0][1] !== 5) {
  throw new Error("Mismatch in insert interval");
}
console.log("Insert Interval passed!");
