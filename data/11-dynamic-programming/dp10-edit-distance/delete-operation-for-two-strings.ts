/**
 * Problem: Delete Operation for Two Strings (LeetCode 583)
 * Difficulty: Medium
 * Pattern: DP10 - Edit distance
 *
 * Find minimum deletions to make word1 and word2 equal (m + n - 2 * LCS).
 */

// --- Optimal Approach (Reduction to LCS) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function minDistanceDeletions(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  let dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        nextDp[j] = 1 + dp[j - 1];
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
console.assert(minDistanceDeletions("sea", "eat") === 2, "Test 1 failed");
console.assert(minDistanceDeletions("leetcode", "etco") === 4, "Test 2 failed");
