/**
 * Problem: Number of Islands (LeetCode 200)
 * Difficulty: Medium
 * Pattern: GR4 - Grid traversal and flood fill
 *
 * Given m x n 2D binary grid '1's (land) and '0's (water), return the number of islands.
 */

// --- Optimal Approach (In-place Grid DFS / Flood Fill) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n) recursion stack
export function numIslands(grid: string[][]): number {
  if (grid.length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0"; // sink the island in-place

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

// --- Test Verification ---
const g1 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];
console.assert(numIslands(g1) === 1, "Test 1 failed");
const g2 = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
];
console.assert(numIslands(g2) === 3, "Test 2 failed");
