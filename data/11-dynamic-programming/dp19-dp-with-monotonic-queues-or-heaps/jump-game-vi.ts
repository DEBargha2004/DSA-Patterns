/**
 * Problem: Jump Game VI (LeetCode 1696)
 * Difficulty: Medium
 * Pattern: DP19 - DP with monotonic queues or heaps
 *
 * Reach index n-1 with max score jumping at most k steps forward.
 */

// --- Optimal Approach (DP + Monotonic Decreasing Deque - O(n)) ---
// dp[i] = nums[i] + max(dp[j]) for j in [i-k, i-1]
// Time Complexity: O(n)
// Space Complexity: O(k)
export function maxResult(nums: number[], k: number): number {
  const n = nums.length;
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];

  const deque: number[] = [0]; // monotonic decreasing deque of dp indices

  for (let i = 1; i < n; i++) {
    // 1. Evict elements outside jump window [i - k, i - 1]
    if (deque[0] < i - k) {
      deque.shift();
    }

    // 2. Compute dp[i] from max in window
    dp[i] = nums[i] + dp[deque[0]];

    // 3. Maintain monotonic decreasing order in deque
    while (deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) {
      deque.pop();
    }
    deque.push(i);
  }

  return dp[n - 1];
}

// --- Test Verification ---
console.assert(maxResult([1, -1, -2, 4, -7, 3], 2) === 7, "Test 1 failed");
console.assert(maxResult([10, -5, -2, 4, 0, 3], 3) === 17, "Test 2 failed");
console.assert(maxResult([1, -5, -20, 4, -1, 3, -6, -3], 2) === 0, "Test 3 failed");
