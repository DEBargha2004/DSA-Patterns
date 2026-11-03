/**
 * Problem: Maximum Product Subarray (LeetCode 152)
 * Difficulty: Medium
 * Pattern: A9 - Kadane's algorithm
 *
 * Given an integer array nums, find a subarray that has the largest product, and return the product.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function maxProductBruteForce(nums: number[]): number {
  let maxProd = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let currentProd = 1;
    for (let j = i; j < nums.length; j++) {
      currentProd *= nums[j];
      maxProd = Math.max(maxProd, currentProd);
    }
  }
  return maxProd;
}

// --- 2. Optimal Approach (Modified Kadane Tracking Min & Max) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// Negative numbers can turn min product into max product, so we track both.
export function maxProductOptimal(nums: number[]): number {
  let result = nums[0];
  let curMax = nums[0];
  let curMin = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    if (num < 0) {
      const temp = curMax;
      curMax = curMin;
      curMin = temp;
    }

    curMax = Math.max(num, curMax * num);
    curMin = Math.min(num, curMin * num);

    result = Math.max(result, curMax);
  }

  return result;
}

// --- Test Verification ---
console.assert(maxProductOptimal([2, 3, -2, 4]) === 6, "Test 1 failed");
console.assert(maxProductOptimal([-2, 0, -1]) === 0, "Test 2 failed");
console.assert(maxProductOptimal([-2, 3, -4]) === 24, "Test 3 failed");
