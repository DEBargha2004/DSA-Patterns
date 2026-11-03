/**
 * Problem: Minimum Path Sum (LeetCode 64)
 * Difficulty: Medium
 * Pattern: DP5 - Grid and two-dimensional DP
 *
 * Find path from (0,0) to (m-1,n-1) which minimizes sum of numbers along path.
 */

// --- Optimal Approach (Space-Optimized 1D Row DP) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0;

  for (let r = 0; r < m; r++) {
    dp[0] += grid[r][0];
    for (let c = 1; c < n; c++) {
      dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
    }
  }

  return dp[n - 1];
}

// --- Test Verification ---
const g = [[1, 3, 1], [1, 5, 1], [4, 2, 1]];
console.assert(minPathSum(g) === 7, "Test 1 failed (1 -> 3 -> 1 -> 1 -> 1 = 7)");
