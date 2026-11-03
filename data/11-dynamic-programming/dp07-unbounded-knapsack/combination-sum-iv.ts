/**
 * Problem: Combination Sum IV (LeetCode 377)
 * Difficulty: Medium
 * Pattern: DP7 - Unbounded knapsack
 *
 * Find number of permutations that add up to target (different orders count as different).
 */

// --- Optimal Approach (Outer Loop over Target counts Permutations) ---
// Time Complexity: O(target * nums.length)
// Space Complexity: O(target)
export function combinationSum4(nums: number[], target: number): number {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let s = 1; s <= target; s++) {
    for (const num of nums) {
      if (s >= num) {
        dp[s] += dp[s - num];
      }
    }
  }

  return dp[target];
}

// --- Test Verification ---
console.assert(combinationSum4([1, 2, 3], 4) === 7, "Test 1 failed (7 permutations)");
console.assert(combinationSum4([9], 3) === 0, "Test 2 failed");
