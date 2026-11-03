/**
 * Problem: Unique Paths (LeetCode 62)
 * Difficulty: Medium
 * Pattern: DP5 - Grid and two-dimensional DP
 *
 * Find unique paths from top-left (0, 0) to bottom-right (m-1, n-1).
 */

// --- Optimal Approach (Space-Optimized 1D Row DP) ---
// dp[c] = dp[c] (from top) + dp[c-1] (from left)
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function uniquePaths(m: number, n: number): number {
  const row = new Array(n).fill(1);

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1];
    }
  }

  return row[n - 1];
}

// --- Test Verification ---
console.assert(uniquePaths(3, 7) === 28, "Test 1 failed");
console.assert(uniquePaths(3, 2) === 3, "Test 2 failed");
