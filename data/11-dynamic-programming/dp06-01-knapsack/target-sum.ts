/**
 * Problem: Target Sum (LeetCode 494)
 * Difficulty: Medium
 * Pattern: DP6 - 0/1 knapsack
 *
 * Assign '+' or '-' to each number to reach target.
 * Positive subset P and Negative subset N: P - N = target, P + N = sum -> P = (sum + target) / 2.
 */

// --- Optimal Approach (Subset Sum 0/1 Knapsack) ---
// Time Complexity: O(n * P)
// Space Complexity: O(P)
export function findTargetSumWays(nums: number[], target: number): number {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > sum || (sum + target) % 2 !== 0) return 0;

  const P = (sum + target) / 2;
  const dp = new Int32Array(P + 1);
  dp[0] = 1;

  for (const num of nums) {
    for (let s = P; s >= num; s--) {
      dp[s] += dp[s - num];
    }
  }

  return dp[P];
}

// --- Test Verification ---
console.assert(findTargetSumWays([1, 1, 1, 1, 1], 3) === 5, "Test 1 failed");
console.assert(findTargetSumWays([1], 1) === 1, "Test 2 failed");
