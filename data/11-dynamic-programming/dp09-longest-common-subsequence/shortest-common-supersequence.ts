/**
 * Problem: Shortest Common Supersequence (LeetCode 1092)
 * Difficulty: Hard
 * Pattern: DP9 - Longest common subsequence
 *
 * Find shortest string that has both str1 and str2 as subsequences.
 */

// --- Optimal Approach (LCS Table + Backtracking) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
export function shortestCommonSupersequence(str1: string, str2: string): string {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build supersequence
  let i = m, j = n;
  let res = "";

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      res = str1[i - 1] + res;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      res = str1[i - 1] + res;
      i--;
    } else {
      res = str2[j - 1] + res;
      j--;
    }
  }

  while (i > 0) { res = str1[i - 1] + res; i--; }
  while (j > 0) { res = str2[j - 1] + res; j--; }

  return res;
}

// --- Test Verification ---
const scs = shortestCommonSupersequence("abac", "cab");
console.assert(scs === "cabac", "Test 1 failed");
