/**
 * Problem: Delete Operation for Two Strings (LeetCode 583)
 * Difficulty: Medium
 * Pattern: S16 - Edit-distance-style string DP
 *
 * Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.
 * In one step, you can delete exactly one character in either string.
 */

// --- Optimal Approach (LCS Reduction: m + n - 2 * LCS) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function minDistanceDelete(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  let dp = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array<number>(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        nextDp[j] = dp[j - 1] + 1;
      } else {
        nextDp[j] = Math.max(dp[j], nextDp[j - 1]);
      }
    }
    dp = nextDp;
  }

  const lcs = dp[n];
  return (m - lcs) + (n - lcs);
}

// --- Test Verification ---
console.assert(minDistanceDelete("sea", "eat") === 2, "Test 1 failed");
console.assert(minDistanceDelete("leetcode", "etco") === 4, "Test 2 failed");
