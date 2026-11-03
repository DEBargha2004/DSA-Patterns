/**
 * Problem: Path With Minimum Effort (LeetCode 1631)
 * Difficulty: Medium
 * Pattern: HP7 - Heap-based shortest paths
 *
 * Find minimum effort route from top-left to bottom-right where effort is max absolute height difference between consecutive cells.
 */

// --- Optimal Approach (Dijkstra on 2D Grid) ---
// Time Complexity: O(rows * cols * log(rows * cols))
// Space Complexity: O(rows * cols)
export function minimumEffortPath(heights: number[][]): number {
  const m = heights.length;
  const n = heights[0].length;
  const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(Infinity));
  dist[0][0] = 0;

  // Min-heap: [effort, r, c]
  const pq: [effort: number, r: number, c: number][] = [[0, 0, 0]];
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = pq.shift()!;

    if (r === m - 1 && c === n - 1) return d;
    if (d > dist[r][c]) continue;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const nextEffort = Math.max(d, Math.abs(heights[r][c] - heights[nr][nc]));
        if (nextEffort < dist[nr][nc]) {
          dist[nr][nc] = nextEffort;
          pq.push([nextEffort, nr, nc]);
        }
      }
    }
  }

  return dist[m - 1][n - 1];
}

// --- Test Verification ---
const g1 = [[1, 2, 2], [3, 8, 2], [5, 3, 5]];
console.assert(minimumEffortPath(g1) === 2, "Test 1 failed");
const g2 = [[1, 2, 3], [3, 8, 4], [5, 3, 5]];
console.assert(minimumEffortPath(g2) === 1, "Test 2 failed");
