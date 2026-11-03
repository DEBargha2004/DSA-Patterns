/**
 * Problem: Contiguous Array (LeetCode 525)
 * Difficulty: Medium
 * Pattern: A7 - Prefix sums with hash maps
 *
 * Given a binary array nums, return the maximum length of a contiguous subarray
 * with an equal number of 0 and 1.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function findMaxLengthBruteForce(nums: number[]): number {
  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeroes++;
      else ones++;
      if (zeroes === ones) {
        maxLen = Math.max(maxLen, j - i + 1);
      }
    }
  }
  return maxLen;
}

// --- 2. Optimal Approach (Transform 0 to -1 + Earliest Prefix Sum Map) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(n)
export function findMaxLengthOptimal(nums: number[]): number {
  let maxLen = 0;
  let prefixSum = 0;
  // Map stores: prefixSum -> earliest index it appeared
  const earliestIndex = new Map<number, number>();
  earliestIndex.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    // Treat 0 as -1 and 1 as +1
    prefixSum += (nums[i] === 1 ? 1 : -1);

    if (earliestIndex.has(prefixSum)) {
      maxLen = Math.max(maxLen, i - earliestIndex.get(prefixSum)!);
    } else {
      earliestIndex.set(prefixSum, i);
    }
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(findMaxLengthOptimal([0, 1]) === 2, "Test 1 failed");
console.assert(findMaxLengthOptimal([0, 1, 0]) === 2, "Test 2 failed");
