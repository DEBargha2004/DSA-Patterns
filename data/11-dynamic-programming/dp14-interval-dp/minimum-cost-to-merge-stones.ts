/**
 * Problem: Minimum Cost to Merge Stones (LeetCode 1000)
 * Difficulty: Hard
 * Pattern: DP14 - Interval DP
 *
 * Find min cost to merge consecutive k stones until 1 pile remains.
 */

// --- Optimal Approach (Interval DP) ---
// Time Complexity: O(n^3 / k)
// Space Complexity: O(n^2)
export function mergeStones(stones: number[], k: number): number {
  const n = stones.length;
  if ((n - 1) % (k - 1) !== 0) return -1;

  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];

  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = k; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;

      for (let mid = i; mid < j; mid += k - 1) {
        dp[i][j] = Math.min(dp[i][j], dp[i][mid] + dp[mid + 1][j]);
      }

      if ((len - 1) % (k - 1) === 0) {
        dp[i][j] += prefix[j + 1] - prefix[i];
      }
    }
  }

  return dp[0][n - 1];
}

// --- Test Verification ---
console.assert(mergeStones([3, 2, 4, 1], 2) === 20, "Test 1 failed");
console.assert(mergeStones([3, 2, 4, 1], 3) === -1, "Test 2 failed");
console.assert(mergeStones([3, 5, 1, 2, 6], 3) === 25, "Test 3 failed");
