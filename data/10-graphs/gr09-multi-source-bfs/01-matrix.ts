/**
 * Problem: 01 Matrix (LeetCode 542)
 * Difficulty: Medium
 * Pattern: GR9 - Multi-source BFS
 *
 * Find distance of each cell from nearest 0 in binary matrix.
 */

// --- Optimal Approach (Multi-source BFS Enqueueing all 0s) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
export function updateMatrix(mat: number[][]): number[][] {
  const m = mat.length;
  const n = mat[0].length;
  const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(-1));
  const queue: [r: number, c: number][] = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return dist;
}

// --- Test Verification ---
const r1 = updateMatrix([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
console.assert(JSON.stringify(r1) === JSON.stringify([[0, 0, 0], [0, 1, 0], [0, 0, 0]]), "Test 1 failed");
const r2 = updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]]);
console.assert(JSON.stringify(r2) === JSON.stringify([[0, 0, 0], [0, 1, 0], [1, 2, 1]]), "Test 2 failed");
