/**
 * Problem: As Far from Land as Possible (LeetCode 1162)
 * Difficulty: Medium
 * Pattern: GR9 - Multi-source BFS
 *
 * Find water cell whose distance to nearest land cell is maximized.
 */

// --- Optimal Approach (Multi-source BFS from all Land cells) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
export function maxDistance(grid: number[][]): number {
  const n = grid.length;
  const queue: [r: number, c: number][] = [];

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        queue.push([r, c]);
      }
    }
  }

  if (queue.length === 0 || queue.length === n * n) return -1;

  let distance = -1;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length > 0) {
    const size = queue.length;
    distance++;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
          grid[nr][nc] = 1; // marked visited
          queue.push([nr, nc]);
        }
      }
    }
  }

  return distance;
}

// --- Test Verification ---
console.assert(maxDistance([[1, 0, 1], [0, 0, 0], [1, 0, 1]]) === 2, "Test 1 failed");
console.assert(maxDistance([[1, 1, 1], [1, 1, 1], [1, 1, 1]]) === -1, "Test 2 failed");
