/**
 * Problem: Partition Equal Subset Sum (LeetCode 416)
 * Difficulty: Medium
 * Pattern: DP6 - 0/1 knapsack
 *
 * Determine if array can be partitioned into two subsets with equal sum.
 */

// --- Optimal Approach (0/1 Knapsack 1D Bitset / Boolean Array) ---
// Target = sum / 2. dp[s] represents if subset sum s is achievable.
// Iterate backwards to ensure each element is used at most once.
// Time Complexity: O(n * target)
// Space Complexity: O(target)
export function canPartition(nums: number[]): boolean {
  let totalSum = 0;
  for (const x of nums) totalSum += x;
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const dp = new Uint8Array(target + 1);
  dp[0] = 1;

  for (const num of nums) {
    for (let s = target; s >= num; s--) {
      if (dp[s - num]) {
        dp[s] = 1;
      }
    }
    if (dp[target]) return true;
  }

  return dp[target] === 1;
}

// --- Test Verification ---
console.assert(canPartition([1, 5, 11, 5]) === true, "Test 1 failed (1+5+5 = 11)");
console.assert(canPartition([1, 2, 3, 5]) === false, "Test 2 failed");
