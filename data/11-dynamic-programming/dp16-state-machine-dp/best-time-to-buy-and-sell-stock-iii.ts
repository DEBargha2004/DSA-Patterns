/**
 * Problem: Best Time to Buy and Sell Stock III (LeetCode 123)
 * Difficulty: Hard
 * Pattern: DP16 - State-machine DP
 *
 * Maximize profit with at most 2 stock transactions.
 */

// --- Optimal Approach (4-State Machine DP) ---
// buy1, sell1, buy2, sell2
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxProfitIII(prices: number[]): number {
  let buy1 = -Infinity;
  let sell1 = 0;
  let buy2 = -Infinity;
  let sell2 = 0;

  for (const p of prices) {
    buy1 = Math.max(buy1, -p);
    sell1 = Math.max(sell1, buy1 + p);
    buy2 = Math.max(buy2, sell1 - p);
    sell2 = Math.max(sell2, buy2 + p);
  }

  return sell2;
}

// --- Test Verification ---
console.assert(maxProfitIII([3, 3, 5, 0, 0, 3, 1, 4]) === 6, "Test 1 failed");
console.assert(maxProfitIII([1, 2, 3, 4, 5]) === 4, "Test 2 failed");
console.assert(maxProfitIII([7, 6, 4, 3, 1]) === 0, "Test 3 failed");
