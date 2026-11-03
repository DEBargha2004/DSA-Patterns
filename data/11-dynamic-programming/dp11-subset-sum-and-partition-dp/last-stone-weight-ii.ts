/**
 * Problem: Last Stone Weight II (LeetCode 1049)
 * Difficulty: Medium
 * Pattern: DP11 - Subset sum and partition DP
 *
 * Find smallest possible weight of left stone after collisions (Partition subset closest to sum/2).
 */

// --- Optimal Approach (Subset Sum Knapsack up to sum / 2) ---
// Time Complexity: O(n * totalSum)
// Space Complexity: O(totalSum)
export function lastStoneWeightII(stones: number[]): number {
  const total = stones.reduce((a, b) => a + b, 0);
  const target = Math.floor(total / 2);
  const dp = new Uint8Array(target + 1);
  dp[0] = 1;

  let maxSubset = 0;
  for (const stone of stones) {
    for (let s = target; s >= stone; s--) {
      if (dp[s - stone]) {
        dp[s] = 1;
        maxSubset = Math.max(maxSubset, s);
      }
    }
  }

  return total - 2 * maxSubset;
}

// --- Test Verification ---
console.assert(lastStoneWeightII([2, 7, 4, 1, 8, 1]) === 1, "Test 1 failed");
console.assert(lastStoneWeightII([31, 26, 33, 21, 40]) === 5, "Test 2 failed");
