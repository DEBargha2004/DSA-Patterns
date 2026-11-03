/**
 * Problem: Sliding Window Maximum (LeetCode 239)
 * Difficulty: Hard
 * Pattern: SW8 - Monotonic deque for window maximum/minimum
 *
 * Return max sliding window of size k moving from very left to very right.
 */

// --- Optimal Approach (Monotonic Decreasing Deque of Indices) ---
// Time Complexity: O(n) - each index pushed and popped at most once
// Space Complexity: O(k)
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove elements outside window boundary [i - k + 1, i]
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // 2. Remove smaller elements from back to maintain decreasing order
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 3. Record window maximum once first window of size k is formed
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)) === JSON.stringify([3, 3, 5, 5, 6, 7]), "Test 1 failed");
console.assert(JSON.stringify(maxSlidingWindow([1], 1)) === JSON.stringify([1]), "Test 2 failed");
