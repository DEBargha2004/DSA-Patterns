/**
 * Problem: Frequency of the Most Frequent Element (LeetCode 1838)
 * Difficulty: Medium
 * Pattern: SW10 - Sliding-window optimization with multiple constraints
 *
 * Return maximum possible frequency of an element after at most k increments.
 */

// --- Optimal Approach (Sort + Sliding Window Condition: nums[right] * windowLen - sum <= k) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1) auxiliary
export function maxFrequency(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  let left = 0;
  let sum = 0;
  let maxFreq = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // If cost to make all elements equal to nums[right] exceeds k, shrink left
    while ((right - left + 1) * nums[right] - sum > k) {
      sum -= nums[left];
      left++;
    }

    maxFreq = Math.max(maxFreq, right - left + 1);
  }

  return maxFreq;
}

// --- Test Verification ---
console.assert(maxFrequency([1, 2, 4], 5) === 3, "Test 1 failed");
console.assert(maxFrequency([1, 4, 8, 13], 5) === 2, "Test 2 failed");
console.assert(maxFrequency([3, 9, 6], 2) === 1, "Test 3 failed");
