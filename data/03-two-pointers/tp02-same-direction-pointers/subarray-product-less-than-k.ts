/**
 * Problem: Subarray Product Less Than K (LeetCode 713)
 * Difficulty: Medium
 * Pattern: TP2 - Same-direction pointers (Sliding expansion)
 *
 * Given an array of integers nums and an integer k, return the number of contiguous subarrays
 * where the product of all elements in the subarray is strictly less than k.
 */

// --- Optimal Approach (Two Pointers Same Direction Window) ---
// Time Complexity: O(n) - each element enters and leaves window once
// Space Complexity: O(1)
export function numSubarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) return 0;

  let product = 1;
  let count = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k && left <= right) {
      product /= nums[left];
      left++;
    }

    count += right - left + 1;
  }

  return count;
}

// --- Test Verification ---
console.assert(numSubarrayProductLessThanK([10, 5, 2, 6], 100) === 8, "Test 1 failed");
console.assert(numSubarrayProductLessThanK([1, 2, 3], 0) === 0, "Test 2 failed");
