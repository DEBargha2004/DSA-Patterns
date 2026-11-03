/**
 * Problem: Matchsticks to Square (LeetCode 473)
 * Difficulty: Medium
 * Pattern: DP17 - Bitmask DP
 *
 * Partition matchsticks into 4 equal sides using Bitmask DP.
 */

// --- Optimal Approach (Bitmask DP tracking side lengths) ---
// Time Complexity: O(n * 2^n)
// Space Complexity: O(2^n)
export function makesquare(matchsticks: number[]): boolean {
  const total = matchsticks.reduce((a, b) => a + b, 0);
  if (total % 4 !== 0) return false;
  const side = total / 4;

  const n = matchsticks.length;
  matchsticks.sort((a, b) => b - a); // largest first
  if (matchsticks[0] > side) return false;

  const memo = new Int8Array(1 << n);
  memo.fill(-1);

  // dp[mask] = current sum modulo side, or -2 if invalid
  function solve(mask: number): number {
    if (mask === 0) return 0;
    if (memo[mask] !== -1) return memo[mask];

    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        const prev = solve(mask ^ (1 << i));
        if (prev >= 0 && prev + matchsticks[i] <= side) {
          const res = (prev + matchsticks[i]) % side;
          memo[mask] = res;
          return res;
        }
      }
    }

    memo[mask] = -2;
    return -2;
  }

  return solve((1 << n) - 1) === 0;
}

// --- Test Verification ---
console.assert(makesquare([1, 1, 2, 2, 2]) === true, "Test 1 failed");
console.assert(makesquare([3, 3, 3, 3, 4]) === false, "Test 2 failed");
