/**
 * Problem: Shortest Subarray with Sum at Least K (LeetCode 862)
 * Difficulty: Hard
 * Pattern: SQ8 - Deque-based processing
 *
 * Find length of shortest non-empty subarray with sum >= k.
 */

// --- Optimal Approach (Prefix Sums + Monotonic Deque) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function shortestSubarray(nums: number[], k: number): number {
  const n = nums.length;
  const prefix = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  let minLen = Infinity;
  const deque: number[] = []; // monotonic increasing prefix sum indices

  for (let i = 0; i <= n; i++) {
    // Check if window is valid
    while (deque.length > 0 && prefix[i] - prefix[deque[0]] >= k) {
      minLen = Math.min(minLen, i - deque.shift()!);
    }

    // Maintain monotonic increasing prefix values in deque
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
console.assert(shortestSubarray([84, -37, 32, 40, 95], 167) === 3, "Test 4 failed");
