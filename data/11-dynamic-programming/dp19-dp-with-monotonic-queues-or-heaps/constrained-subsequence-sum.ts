/**
 * Problem: Constrained Subsequence Sum (LeetCode 1425)
 * Difficulty: Hard
 * Pattern: DP19 - DP with monotonic queues or heaps
 *
 * Maximize sum of non-empty subsequence where adjacent indices j - i <= k.
 */

// --- Optimal Approach (DP with Monotonic Decreasing Deque) ---
// dp[i] = nums[i] + max(0, max_{i-k <= j < i} dp[j])
// Time Complexity: O(n)
// Space Complexity: O(k)
export function constrainedSubsetSum(nums: number[], k: number): number {
  const n = nums.length;
  const dp = new Array(n).fill(0);
  let maxSum = nums[0];
  const deque: number[] = [];

  for (let i = 0; i < n; i++) {
    if (deque.length > 0 && deque[0] < i - k) {
      deque.shift();
    }

    const prevMax = deque.length > 0 ? Math.max(0, dp[deque[0]]) : 0;
    dp[i] = nums[i] + prevMax;
    maxSum = Math.max(maxSum, dp[i]);

    while (deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) {
      deque.pop();
    }
    deque.push(i);
  }

  return maxSum;
}

// --- Test Verification ---
console.assert(constrainedSubsetSum([10, 2, -10, 5, 20], 2) === 37, "Test 1 failed");
console.assert(constrainedSubsetSum([-1, -2, -3], 1) === -1, "Test 2 failed");
console.assert(constrainedSubsetSum([10, -2, -10, -5, 20], 2) === 23, "Test 3 failed");
