/**
 * Problem: Sliding Window Maximum (LeetCode 239)
 * Difficulty: Hard
 * Pattern: SQ8 - Deque-based processing
 *
 * Return max sliding window of size k in array nums.
 */

// --- Optimal Approach (Monotonic Decreasing Deque) ---
// Time Complexity: O(n)
// Space Complexity: O(k)
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const deque: number[] = []; // stores indices

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove elements outside current window
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // 2. Remove elements smaller than current element
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 3. Add to result once first window is formed
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)) === JSON.stringify([3, 3, 5, 5, 6, 7]), "Test 1 failed");
console.assert(JSON.stringify(maxSlidingWindow([1], 1)) === JSON.stringify([1]), "Test 2 failed");
