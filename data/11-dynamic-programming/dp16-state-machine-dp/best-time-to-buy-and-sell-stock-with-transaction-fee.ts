/**
 * Problem: Best Time to Buy and Sell Stock with Transaction Fee (LeetCode 714)
 * Difficulty: Medium
 * Pattern: DP16 - State-machine DP
 *
 * Maximize profit with unlimited transactions and a fixed fee per transaction.
 */

// --- Optimal Approach (2-State DP: Hold and Cash) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxProfitWithFee(prices: number[], fee: number): number {
  let hold = -prices[0];
  let cash = 0;

  for (let i = 1; i < prices.length; i++) {
    const p = prices[i];
    cash = Math.max(cash, hold + p - fee);
    hold = Math.max(hold, cash - p);
  }

  return cash;
}

// --- Test Verification ---
console.assert(maxProfitWithFee([1, 3, 2, 8, 4, 9], 2) === 8, "Test 1 failed");
console.assert(maxProfitWithFee([1, 3, 7, 5, 10, 3], 3) === 6, "Test 2 failed");
