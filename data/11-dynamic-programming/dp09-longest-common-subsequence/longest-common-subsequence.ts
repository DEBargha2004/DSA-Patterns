/**
 * Problem: Longest Common Subsequence (LeetCode 1143)
 * Difficulty: Medium
 * Pattern: DP9 - Longest common subsequence
 *
 * Find length of longest common subsequence between text1 and text2.
 */

// --- Optimal Approach (Space-Optimized 1D Row DP) ---
// dp[i][j] = text1[i-1] === text2[j-1] ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])
// Time Complexity: O(m * n)
// Space Complexity: O(min(m, n))
export function longestCommonSubsequence(text1: string, text2: string): number {
  if (text1.length < text2.length) {
    [text1, text2] = [text2, text1];
  }
  const m = text1.length;
  const n = text2.length;
  let dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        nextDp[j] = 1 + dp[j - 1];
      } else {
        nextDp[j] = Math.max(dp[j], nextDp[j - 1]);
      }
    }
    dp = nextDp;
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(longestCommonSubsequence("abcde", "ace") === 3, "Test 1 failed");
console.assert(longestCommonSubsequence("abc", "abc") === 3, "Test 2 failed");
console.assert(longestCommonSubsequence("abc", "def") === 0, "Test 3 failed");
