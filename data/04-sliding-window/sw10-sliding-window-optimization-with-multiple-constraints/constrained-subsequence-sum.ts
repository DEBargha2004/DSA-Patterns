/**
 * Problem: Constrained Subsequence Sum (LeetCode 1425)
 * Difficulty: Hard
 * Pattern: SW10 - Sliding-window optimization with multiple constraints
 *
 * Maximum sum of non-empty subsequence where every two consecutive numbers have index diff <= k.
 */

// --- Optimal Approach (DP with Monotonic Decreasing Deque Window of Size K) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function constrainedSubsetSum(nums: number[], k: number): number {
  const n = nums.length;
  const dp = new Array<number>(n);
  const deque: number[] = [];
  let ans = nums[0];

  for (let i = 0; i < n; i++) {
    while (deque.length > 0 && deque[0] < i - k) {
      deque.shift();
    }

    const prevMax = deque.length > 0 ? dp[deque[0]] : 0;
    dp[i] = nums[i] + Math.max(0, prevMax);
    ans = Math.max(ans, dp[i]);

    while (deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) {
      deque.pop();
    }

    deque.push(i);
  }

  return ans;
}

// --- Test Verification ---
console.assert(constrainedSubsetSum([10, 2, -10, 5, 20], 2) === 37, "Test 1 failed");
console.assert(constrainedSubsetSum([-1, -2, -3], 1) === -1, "Test 2 failed");
console.assert(constrainedSubsetSum([10, -2, -10, -5, 20], 2) === 23, "Test 3 failed");
