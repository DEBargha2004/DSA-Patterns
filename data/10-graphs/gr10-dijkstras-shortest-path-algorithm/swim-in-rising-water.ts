/**
 * Problem: Swim in Rising Water (LeetCode 778)
 * Difficulty: Hard
 * Pattern: GR10 - Dijkstra's shortest-path algorithm
 *
 * Find least time until you can swim from (0, 0) to (n-1, n-1) with grid elevation.
 */

// --- Optimal Approach (Dijkstra / Min-Heap Priority Queue) ---
// Time Complexity: O(n^2 log n)
// Space Complexity: O(n^2)
export function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  dist[0][0] = grid[0][0];

  const pq: [time: number, r: number, c: number][] = [[grid[0][0], 0, 0]];
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [t, r, c] = pq.shift()!;

    if (r === n - 1 && c === n - 1) return t;
    if (t > dist[r][c]) continue;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
        const nextTime = Math.max(t, grid[nr][nc]);
        if (nextTime < dist[nr][nc]) {
          dist[nr][nc] = nextTime;
          pq.push([nextTime, nr, nc]);
        }
      }
    }
  }

  return dist[n - 1][n - 1];
}

// --- Test Verification ---
console.assert(swimInWater([[0, 2], [1, 3]]) === 3, "Test 1 failed");
console.assert(swimInWater([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]) === 16, "Test 2 failed");
