/**
 * Problem: Uncrossed Lines (LeetCode 1035)
 * Difficulty: Medium
 * Pattern: DP9 - Longest common subsequence
 *
 * Find max uncrossed lines connecting equal elements (exact LCS formulation).
 */

// --- Optimal Approach (1D LCS DP) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  let dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        nextDp[j] = 1 + dp[j - 1];
      } else {
        nextDp[j] = Math.max(dp[j], nextDp[j - 1]);
      }
    }
    dp = nextDp;
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(maxUncrossedLines([1, 4, 2], [1, 2, 4]) === 2, "Test 1 failed");
console.assert(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2]) === 3, "Test 2 failed");
