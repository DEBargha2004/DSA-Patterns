/**
 * Problem: Min Cost Climbing Stairs (LeetCode 746)
 * Difficulty: Easy
 * Pattern: DP2 - Memoization versus tabulation
 *
 * Find minimum cost to reach top of floor starting from index 0 or 1.
 */

// --- Memoization (Top-down) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function minCostClimbingStairsMemo(cost: number[]): number {
  const memo = new Map<number, number>();

  function dp(i: number): number {
    if (i >= cost.length) return 0;
    if (memo.has(i)) return memo.get(i)!;
    const res = cost[i] + Math.min(dp(i + 1), dp(i + 2));
    memo.set(i, res);
    return res;
  }

  return Math.min(dp(0), dp(1));
}

// --- Tabulation (Bottom-up O(1) Space) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function minCostClimbingStairs(cost: number[]): number {
  let prev2 = 0;
  let prev1 = 0;

  for (let i = 2; i <= cost.length; i++) {
    const curr = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// --- Test Verification ---
const c1 = [10, 15, 20];
console.assert(minCostClimbingStairsMemo(c1) === 15, "Memo 1 failed");
console.assert(minCostClimbingStairs(c1) === 15, "Tabulation 1 failed");
const c2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
console.assert(minCostClimbingStairs(c2) === 6, "Tabulation 2 failed");
