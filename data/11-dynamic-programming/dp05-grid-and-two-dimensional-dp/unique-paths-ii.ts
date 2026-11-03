/**
 * Problem: Unique Paths II (LeetCode 63)
 * Difficulty: Medium
 * Pattern: DP5 - Grid and two-dimensional DP
 *
 * Unique paths with obstacles (1 = obstacle, 0 = space).
 */

// --- Optimal Approach (1D Row DP with Obstacle Zeroing) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;

  const dp = new Array(n).fill(0);
  dp[0] = 1;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (obstacleGrid[r][c] === 1) {
        dp[c] = 0;
      } else if (c > 0) {
        dp[c] += dp[c - 1];
      }
    }
  }

  return dp[n - 1];
}

// --- Test Verification ---
console.assert(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]) === 2, "Test 1 failed");
console.assert(uniquePathsWithObstacles([[0, 1], [0, 0]]) === 1, "Test 2 failed");
