/**
 * Problem: Coin Change (LeetCode 322)
 * Difficulty: Medium
 * Pattern: DP7 - Unbounded knapsack
 *
 * Find fewest coins needed to make up amount (infinite supply of each coin).
 */

// --- Optimal Approach (Unbounded Knapsack DP - Forward Iteration) ---
// Time Complexity: O(amount * coins.length)
// Space Complexity: O(amount)
export function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let x = coin; x <= amount; x++) {
      dp[x] = Math.min(dp[x], 1 + dp[x - coin]);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// --- Test Verification ---
console.assert(coinChange([1, 2, 5], 11) === 3, "Test 1 failed (5 + 5 + 1 = 11)");
console.assert(coinChange([2], 3) === -1, "Test 2 failed");
console.assert(coinChange([1], 0) === 0, "Test 3 failed");
