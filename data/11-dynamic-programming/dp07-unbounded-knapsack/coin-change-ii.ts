/**
 * Problem: Coin Change II (LeetCode 518)
 * Difficulty: Medium
 * Pattern: DP7 - Unbounded knapsack
 *
 * Number of combinations that make up amount using infinite coins.
 */

// --- Optimal Approach (Outer Loop over Coins ensures Combinations, not Permutations) ---
// Time Complexity: O(coins.length * amount)
// Space Complexity: O(amount)
export function change(amount: number, coins: number[]): number {
  const dp = new Int32Array(amount + 1);
  dp[0] = 1;

  for (const coin of coins) {
    for (let x = coin; x <= amount; x++) {
      dp[x] += dp[x - coin];
    }
  }

  return dp[amount];
}

// --- Test Verification ---
console.assert(change(5, [1, 2, 5]) === 4, "Test 1 failed (4 combinations: 5, 2+2+1, 2+1+1+1, 1*5)");
console.assert(change(3, [2]) === 0, "Test 2 failed");
console.assert(change(10, [10]) === 1, "Test 3 failed");
