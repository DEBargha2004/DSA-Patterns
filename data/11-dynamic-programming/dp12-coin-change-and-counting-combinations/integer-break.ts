/**
 * Problem: Integer Break (LeetCode 343)
 * Difficulty: Medium
 * Pattern: DP12 - Coin change and counting combinations
 *
 * Break integer n into sum of at least two positive integers to maximize product.
 */

// --- Optimal Approach (1D DP / Math with 3s) ---
// dp[i] = max(j * (i - j), j * dp[i - j])
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function integerBreak(n: number): number {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(integerBreak(2) === 1, "Test 1 failed (1 + 1 -> 1)");
console.assert(integerBreak(10) === 36, "Test 2 failed (3 + 3 + 4 -> 36)");
