/**
 * Problem: Best Time to Buy and Sell Stock with Cooldown (LeetCode 309)
 * Difficulty: Medium
 * Pattern: DP4 - Take-or-skip decisions
 *
 * Maximize profit with cooldown day after selling stock.
 */

// --- Optimal Approach (State Machine Take-or-Skip DP) ---
// Hold, Sold, Rest states
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxProfitCooldown(prices: number[]): number {
  if (prices.length <= 1) return 0;

  let hold = -prices[0];
  let sold = 0;
  let rest = 0;

  for (let i = 1; i < prices.length; i++) {
    const prevHold = hold;
    const prevSold = sold;
    const prevRest = rest;

    hold = Math.max(prevHold, prevRest - prices[i]);
    sold = prevHold + prices[i];
    rest = Math.max(prevRest, prevSold);
  }

  return Math.max(sold, rest);
}

// --- Test Verification ---
console.assert(maxProfitCooldown([1, 2, 3, 0, 2]) === 3, "Test 1 failed");
console.assert(maxProfitCooldown([1]) === 0, "Test 2 failed");
