/**
 * Problem: Subarrays with K Different Integers (LeetCode 992)
 * Difficulty: Hard
 * Pattern: SW6 - Window with at most k distinct elements
 *
 * Count subarrays with exactly k different integers via atMost(k) - atMost(k - 1).
 */

// --- Optimal Approach (At Most K Reduction) ---
// Time Complexity: O(n)
// Space Complexity: O(k)
export function subarraysWithKDistinct(nums: number[], k: number): number {
  function atMost(limit: number): number {
    if (limit <= 0) return 0;
    const freq = new Map<number, number>();
    let left = 0, count = 0;

    for (let right = 0; right < nums.length; right++) {
      freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);

      while (freq.size > limit) {
        freq.set(nums[left], freq.get(nums[left])! - 1);
        if (freq.get(nums[left]) === 0) freq.delete(nums[left]);
        left++;
      }

      count += right - left + 1;
    }

    return count;
  }

  return atMost(k) - atMost(k - 1);
}

// --- Test Verification ---
console.assert(subarraysWithKDistinct([1, 2, 1, 2, 3], 2) === 7, "Test 1 failed");
console.assert(subarraysWithKDistinct([1, 2, 1, 3, 4], 3) === 3, "Test 2 failed");
