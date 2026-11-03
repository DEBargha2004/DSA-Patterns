/**
 * Problem: Shortest Path in Binary Matrix (LeetCode 1091)
 * Difficulty: Medium
 * Pattern: GR2 - BFS for shortest paths in unweighted graphs
 *
 * Find length of shortest clear path from (0, 0) to (n-1, n-1) with 8-directional moves.
 */

// --- Optimal Approach (BFS 8-Directional Level Traversal) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
export function shortestPathBinaryMatrix(grid: number[][]): number {
  const n = grid.length;
  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;
  if (n === 1) return 1;

  const queue: [r: number, c: number, dist: number][] = [[0, 0, 1]];
  grid[0][0] = 1; // mark visited

  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift()!;
    if (r === n - 1 && c === n - 1) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(shortestPathBinaryMatrix([[0, 1], [1, 0]]) === 2, "Test 1 failed");
console.assert(shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]) === 4, "Test 2 failed");
console.assert(shortestPathBinaryMatrix([[1, 0], [0, 0]]) === -1, "Test 3 failed");
