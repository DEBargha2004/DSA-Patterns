/**
 * Problem: Distinct Subsequences (LeetCode 115)
 * Difficulty: Hard
 * Pattern: DP13 - String matching DP
 *
 * Count distinct subsequences of s which equal t.
 */

// --- Optimal Approach (1D Row DP) ---
// dp[j] = number of distinct subsequences of s matching t[0...j]
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function numDistinct(s: string, t: string): number {
  const m = s.length;
  const n = t.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (s[i - 1] === t[j - 1]) {
        dp[j] += dp[j - 1];
      }
    }
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(numDistinct("rabbbit", "rabbit") === 3, "Test 1 failed");
console.assert(numDistinct("babgbag", "bag") === 5, "Test 2 failed");
