/**
 * Pattern: Jump-game-style reachability
 * Problem: Jump Game II (LeetCode 45)
 *
 * Return the minimum number of jumps to reach index n - 1.
 */

// Brute Force: Dynamic Programming DP[i] = min jumps to reach i
// Time: O(N^2), Space: O(N)
export function jumpDP(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= nums[i] && i + j < n; j++) {
      dp[i + j] = Math.min(dp[i + j], dp[i] + 1);
    }
  }

  return dp[n - 1];
}

// Optimal: Greedy BFS Window (Current Jump Horizon & Next Jump Horizon)
// Time: O(N), Space: O(1)
export function jumpOptimal(nums: number[]): number {
  const n = nums.length;
  if (n <= 1) return 0;

  let jumps = 0;
  let currentEnd = 0;
  let furthest = 0;

  for (let i = 0; i < n - 1; i++) {
    furthest = Math.max(furthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = furthest;
      if (currentEnd >= n - 1) break;
    }
  }

  return jumps;
}

// Test cases
const jNums = [2, 3, 1, 1, 4];
if (jumpDP(jNums) !== 2 || jumpOptimal(jNums) !== 2) throw new Error("Expected 2 jumps");
console.log("Jump Game II passed!");
