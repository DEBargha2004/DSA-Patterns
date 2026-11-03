/**
 * Problem: Strange Printer (LeetCode 664)
 * Difficulty: Hard
 * Pattern: DP14 - Interval DP
 *
 * Find minimum turns printer needs to print string s.
 */

// --- Optimal Approach (Interval DP) ---
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)
export function strangePrinter(s: string): number {
  if (s.length === 0) return 0;
  const n = s.length;
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) dp[i][i] = 1;

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = dp[i][j - 1];
      if (s[j] !== s[j - 1]) {
        dp[i][j] = dp[i][j - 1] + 1;
        for (let k = i; k < j; k++) {
          if (s[k] === s[j]) {
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0));
          }
        }
      }
    }
  }

  return dp[0][n - 1];
}

// --- Test Verification ---
console.assert(strangePrinter("aaabbb") === 2, "Test 1 failed");
console.assert(strangePrinter("aba") === 2, "Test 2 failed");
