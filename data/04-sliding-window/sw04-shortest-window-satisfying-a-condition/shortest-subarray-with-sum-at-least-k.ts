/**
 * Problem: Shortest Subarray with Sum at Least K (LeetCode 862)
 * Difficulty: Hard
 * Pattern: SW4 - Shortest window satisfying a condition (Monotonic Deque)
 *
 * Given integer array nums and integer k, return length of shortest non-empty subarray with sum >= k.
 * Can contain negative numbers!
 */

// --- Optimal Approach (Prefix Sum + Monotonic Increasing Deque) ---
// Time Complexity: O(n) - each index pushed and popped at most once
// Space Complexity: O(n)
export function shortestSubarray(nums: number[], k: number): number {
  const n = nums.length;
  const prefix = new Array<number>(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

  let minLen = Infinity;
  const deque: number[] = []; // Stores indices with strictly increasing prefix sums

  for (let i = 0; i <= n; i++) {
    // Condition 1: Check if current prefix can form valid subarray with deque front
    while (deque.length > 0 && prefix[i] - prefix[deque[0]] >= k) {
      minLen = Math.min(minLen, i - deque.shift()!);
    }

    // Condition 2: Maintain monotonic increasing property in deque
    while (deque.length > 0 && prefix[i] <= prefix[deque[deque.length - 1]]) {
      deque.pop();
    }

    deque.push(i);
  }

  return minLen === Infinity ? -1 : minLen;
}

// --- Test Verification ---
console.assert(shortestSubarray([1], 1) === 1, "Test 1 failed");
console.assert(shortestSubarray([1, 2], 4) === -1, "Test 2 failed");
console.assert(shortestSubarray([2, -1, 2], 3) === 3, "Test 3 failed");
