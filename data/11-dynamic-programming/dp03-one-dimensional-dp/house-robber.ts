/**
 * Problem: House Robber (LeetCode 198)
 * Difficulty: Medium
 * Pattern: DP3 - One-dimensional DP
 *
 * Maximize money robbed without robbing two adjacent houses.
 */

// --- Optimal Approach (1D DP with Rolling Maxima) ---
// dp[i] = max(dp[i-1], dp[i-2] + nums[i])
// Time Complexity: O(n)
// Space Complexity: O(1)
export function rob(nums: number[]): number {
  let prevRob = 0;
  let prevNotRob = 0;

  for (const num of nums) {
    const currRob = prevNotRob + num;
    const currNotRob = Math.max(prevNotRob, prevRob);
    prevRob = currRob;
    prevNotRob = currNotRob;
  }

  return Math.max(prevRob, prevNotRob);
}

// --- Test Verification ---
console.assert(rob([1, 2, 3, 1]) === 4, "Test 1 failed");
console.assert(rob([2, 7, 9, 3, 1]) === 12, "Test 2 failed");
