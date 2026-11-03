/**
 * Problem: Best Time to Buy and Sell Stock IV (LeetCode 188)
 * Difficulty: Hard
 * Pattern: DP16 - State-machine DP
 *
 * Maximize profit with at most k stock transactions.
 */

// --- Optimal Approach (K-State Machine DP) ---
// Time Complexity: O(n * k)
// Space Complexity: O(k)
export function maxProfitIV(k: number, prices: number[]): number {
  if (prices.length <= 1 || k === 0) return 0;

  if (k >= Math.floor(prices.length / 2)) {
    // Unlimited transactions
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
    }
    return profit;
  }

  const buy = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);

  for (const p of prices) {
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - p);
      sell[j] = Math.max(sell[j], buy[j] + p);
    }
  }

  return sell[k];
}

// --- Test Verification ---
console.assert(maxProfitIV(2, [2, 4, 1]) === 2, "Test 1 failed");
console.assert(maxProfitIV(2, [3, 2, 6, 5, 0, 3]) === 7, "Test 2 failed");
