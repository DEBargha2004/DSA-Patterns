/**
 * Pattern: Interval merging
 * Problem: Merge Intervals (LeetCode 56)
 *
 * Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.
 */

// Brute Force: Connected Component Graph (Graph DFS/BFS to find overlapping clusters)
// Time: O(N^2), Space: O(N^2)
export function mergeIntervalsGraph(intervals: number[][]): number[][] {
  const n = intervals.length;
  if (n <= 1) return intervals;

  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.max(intervals[i][0], intervals[j][0]) <= Math.min(intervals[i][1], intervals[j][1])) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }

  const visited = new Set<number>();
  const result: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      const queue = [i];
      visited.add(i);
      let minStart = intervals[i][0];
      let maxEnd = intervals[i][1];

      while (queue.length > 0) {
        const u = queue.shift()!;
        minStart = Math.min(minStart, intervals[u][0]);
        maxEnd = Math.max(maxEnd, intervals[u][1]);

        for (const v of adj[u]) {
          if (!visited.has(v)) {
            visited.add(v);
            queue.push(v);
          }
        }
      }

      result.push([minStart, maxEnd]);
    }
  }

  return result.sort((a, b) => a[0] - b[0]);
}

// Optimal: Sort by start time + single pass merge
// Time: O(N log N), Space: O(N) for sort output
export function mergeIntervalsOptimal(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      // Overlap: merge intervals
      last[1] = Math.max(last[1], current[1]);
    } else {
      // Disjoint: add as new interval
      merged.push(current);
    }
  }

  return merged;
}

// Test cases
const ints = [[1, 3], [2, 6], [8, 10], [15, 18]];
const m1 = mergeIntervalsGraph(ints);
const m2 = mergeIntervalsOptimal(ints);
if (JSON.stringify(m1) !== JSON.stringify(m2) || m2.length !== 3) {
  throw new Error("Mismatch in merge intervals");
}
console.log("Merge Intervals passed!");
