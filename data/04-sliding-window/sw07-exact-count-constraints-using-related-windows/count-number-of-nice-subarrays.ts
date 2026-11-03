/**
 * Problem: Count Number of Nice Subarrays (LeetCode 1248)
 * Difficulty: Medium
 * Pattern: SW7 - Exact-count constraints using related windows
 *
 * Continuous subarray is nice if it contains exactly k odd numbers.
 */

// --- Optimal Approach (Exact K Odds = atMost(k) - atMost(k - 1)) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function numberOfSubarrays(nums: number[], k: number): number {
  function atMost(limit: number): number {
    if (limit < 0) return 0;
    let left = 0, odds = 0, count = 0;

    for (let right = 0; right < nums.length; right++) {
      if (nums[right] % 2 !== 0) odds++;
      while (odds > limit) {
        if (nums[left] % 2 !== 0) odds--;
        left++;
      }
      count += right - left + 1;
    }

    return count;
  }

  return atMost(k) - atMost(k - 1);
}

// --- Test Verification ---
console.assert(numberOfSubarrays([1, 1, 2, 1, 1], 3) === 2, "Test 1 failed");
console.assert(numberOfSubarrays([2, 4, 6], 1) === 0, "Test 2 failed");
