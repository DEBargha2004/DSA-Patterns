/**
 * Problem: Rotting Oranges (LeetCode 994)
 * Difficulty: Medium
 * Pattern: SQ7 - Queue-based BFS
 *
 * Given an m x n grid where 0 is empty, 1 is fresh, 2 is rotten,
 * find minimum minutes until no fresh orange remains, or -1 if impossible.
 */

// --- Optimal Approach (Multi-source BFS with Queue) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
export function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let freshCount = 0;
  const queue: [row: number, col: number][] = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      } else if (grid[r][c] === 1) {
        freshCount++;
      }
    }
  }

  if (freshCount === 0) return 0;

  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length > 0 && freshCount > 0) {
    const levelSize = queue.length;
    minutes++;

    for (let i = 0; i < levelSize; i++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          freshCount--;
          queue.push([nr, nc]);
        }
      }
    }
  }

  return freshCount === 0 ? minutes : -1;
}

// --- Test Verification ---
console.assert(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]) === 4, "Test 1 failed");
console.assert(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]) === -1, "Test 2 failed");
console.assert(orangesRotting([[0, 2]]) === 0, "Test 3 failed");
