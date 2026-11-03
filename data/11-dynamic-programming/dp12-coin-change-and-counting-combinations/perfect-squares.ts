/**
 * Problem: Perfect Squares (LeetCode 279)
 * Difficulty: Medium
 * Pattern: DP12 - Coin change and counting combinations
 *
 * Find least number of perfect square numbers that sum to n (Unbounded Knapsack with coins = squares).
 */

// --- Optimal Approach (1D Unbounded Knapsack DP) ---
// Time Complexity: O(n * sqrt(n))
// Space Complexity: O(n)
export function numSquares(n: number): number {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let s = 1; s * s <= n; s++) {
    const sq = s * s;
    for (let x = sq; x <= n; x++) {
      dp[x] = Math.min(dp[x], 1 + dp[x - sq]);
    }
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(numSquares(12) === 3, "Test 1 failed (4 + 4 + 4 = 12)");
console.assert(numSquares(13) === 2, "Test 2 failed (4 + 9 = 13)");
