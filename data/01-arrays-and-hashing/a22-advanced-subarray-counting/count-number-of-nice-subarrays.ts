/**
 * Problem: Count Number of Nice Subarrays (LeetCode 1248)
 * Difficulty: Medium
 * Pattern: A22 - Advanced subarray counting
 *
 * Given an array of integers nums and an integer k. A continuous subarray is called nice
 * if there are k odd numbers on it. Return the number of nice sub-arrays.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function numberOfSubarraysBruteForce(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let odds = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % 2 !== 0) odds++;
      if (odds === k) count++;
      if (odds > k) break;
    }
  }
  return count;
}

// --- 2. Optimal Approach (Exact K = AtMost(K) - AtMost(K - 1)) ---
// Time Complexity: O(n) - two sliding window passes
// Space Complexity: O(1)
export function numberOfSubarraysOptimal(nums: number[], k: number): number {
  function atMostK(limit: number): number {
    if (limit < 0) return 0;
    let left = 0;
    let odds = 0;
    let count = 0;

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

  return atMostK(k) - atMostK(k - 1);
}

// --- Test Verification ---
console.assert(numberOfSubarraysOptimal([1, 1, 2, 1, 1], 3) === 2, "Test 1 failed");
console.assert(numberOfSubarraysOptimal([2, 4, 6], 1) === 0, "Test 2 failed");
console.assert(numberOfSubarraysOptimal([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2) === 16, "Test 3 failed");
