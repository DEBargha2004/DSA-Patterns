/**
 * Problem: Jump Game VI (LeetCode 1696)
 * Difficulty: Medium
 * Pattern: SW8 - Monotonic deque for window maximum/minimum
 *
 * Return maximum score you can get starting at index 0 and reaching index n - 1 with jump length at most k.
 */

// --- Optimal Approach (DP with Monotonic Decreasing Deque Window of Size K) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function maxResult(nums: number[], k: number): number {
  const n = nums.length;
  const dp = new Array<number>(n);
  dp[0] = nums[0];

  const deque: number[] = [0]; // Stores indices of max DP values in window

  for (let i = 1; i < n; i++) {
    // Remove indices outside window [i - k, i - 1]
    while (deque.length > 0 && deque[0] < i - k) {
      deque.shift();
    }

    dp[i] = dp[deque[0]] + nums[i];

    // Maintain decreasing order in deque
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
