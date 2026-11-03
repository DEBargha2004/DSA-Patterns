/**
 * Problem: Max Area of Island (LeetCode 695)
 * Difficulty: Medium
 * Pattern: GR4 - Grid traversal and flood fill
 *
 * Find maximum area of an island in binary grid.
 */

// --- Optimal Approach (In-place Grid Flood Fill DFS) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
export function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let maxArea = 0;

  function dfs(r: number, c: number): number {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== 1) return 0;
    grid[r][c] = 0; // mark visited

    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }

  return maxArea;
}

// --- Test Verification ---
const grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
];
console.assert(maxAreaOfIsland(grid) === 4, "Test 1 failed");
console.assert(maxAreaOfIsland([[0, 0, 0]]) === 0, "Test 2 failed");
