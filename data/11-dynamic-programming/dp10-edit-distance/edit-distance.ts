/**
 * Problem: Edit Distance (LeetCode 72)
 * Difficulty: Medium
 * Pattern: DP10 - Edit distance
 *
 * Find min operations (insert, delete, replace) to convert word1 to word2.
 */

// --- Optimal Approach (Space-Optimized 1D Row DP) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  let dp = Array.from({ length: n + 1 }, (_, j) => j);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1);
    nextDp[0] = i;

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        nextDp[j] = dp[j - 1];
      } else {
        nextDp[j] = 1 + Math.min(dp[j], nextDp[j - 1], dp[j - 1]); // del, ins, rep
      }
    }
    dp = nextDp;
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(minDistance("horse", "ros") === 3, "Test 1 failed");
console.assert(minDistance("intention", "execution") === 5, "Test 2 failed");
console.assert(minDistance("", "") === 0, "Test 3 failed");
