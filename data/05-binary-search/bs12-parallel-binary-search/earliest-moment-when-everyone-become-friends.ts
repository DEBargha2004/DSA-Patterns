/**
 * Problem: The Earliest Moment When Everyone Become Friends (LeetCode 1101)
 * Difficulty: Medium
 * Pattern: BS12 - Binary search on timeline + DSU
 *
 * Find earliest timestamp when all persons become acquaintances.
 */

// --- Optimal Approach (Sort Logs + Binary Search / DSU Sweep) ---
// Time Complexity: O(L log L + L * alpha(n))
// Space Complexity: O(n)
export function earliestAcq(logs: number[][], n: number): number {
  logs.sort((a, b) => a[0] - b[0]);

  const parent = Array.from({ length: n }, (_, i) => i);
  let components = n;

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x: number, y: number): boolean {
    const rx = find(x), ry = find(y);
    if (rx === ry) return false;
    parent[rx] = ry;
    return true;
  }

  for (const [time, x, y] of logs) {
    if (union(x, y)) {
      components--;
      if (components === 1) return time;
    }
  }

  return -1;
}

// --- Test Verification ---
const logs = [
  [20190101, 0, 1],
  [20190104, 3, 4],
  [20190107, 2, 3],
  [20190211, 1, 5],
  [20190224, 2, 4],
  [20190301, 0, 3],
  [20190312, 1, 2],
  [20190322, 4, 5]
];
console.assert(earliestAcq(logs, 6) === 20190301, "Test failed");
