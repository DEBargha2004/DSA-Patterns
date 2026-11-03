/**
 * Problem: Burst Balloons (LeetCode 312)
 * Difficulty: Hard
 * Pattern: DP14 - Interval DP
 *
 * Burst balloons to maximize coins collected: choose LAST balloon k to burst in (i, j).
 */

// --- Optimal Approach (Interval DP: Length from 1 to n) ---
// dp[i][j] = max coins from bursting all balloons strictly between i and j.
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)
export function maxCoins(nums: number[]): number {
  const padded = [1, ...nums, 1];
  const n = padded.length;
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 1; len <= nums.length; len++) {
    for (let i = 0; i <= n - len - 2; i++) {
      const j = i + len + 1;
      for (let k = i + 1; k < j; k++) {
        const coins = padded[i] * padded[k] * padded[j] + dp[i][k] + dp[k][j];
        dp[i][j] = Math.max(dp[i][j], coins);
      }
    }
  }

  return dp[0][n - 1];
}

// --- Test Verification ---
console.assert(maxCoins([3, 1, 5, 8]) === 167, "Test 1 failed");
console.assert(maxCoins([1, 5]) === 10, "Test 2 failed");
