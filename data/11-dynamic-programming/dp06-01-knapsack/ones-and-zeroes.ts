/**
 * Problem: Ones and Zeroes (LeetCode 474)
 * Difficulty: Medium
 * Pattern: DP6 - 0/1 knapsack
 *
 * Find maximum size of subset formed with at most m zeros and n ones (2D 0/1 Knapsack).
 */

// --- Optimal Approach (2D Knapsack Reverse Iteration) ---
// Time Complexity: O(strs.length * m * n)
// Space Complexity: O(m * n)
export function findMaxForm(strs: string[], m: number, n: number): number {
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (const s of strs) {
    let zeros = 0;
    let ones = 0;
    for (const ch of s) {
      if (ch === "0") zeros++;
      else ones++;
    }

    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        dp[i][j] = Math.max(dp[i][j], 1 + dp[i - zeros][j - ones]);
      }
    }
  }

  return dp[m][n];
}

// --- Test Verification ---
const strs = ["10", "0001", "111001", "1", "0"];
console.assert(findMaxForm(strs, 5, 3) === 4, "Test 1 failed");
console.assert(findMaxForm(strs, 1, 1) === 2, "Test 2 failed");
