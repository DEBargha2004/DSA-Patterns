/**
 * Problem: Subarray Sum Equals K (LeetCode 560)
 * Difficulty: Medium
 * Pattern: A7 - Prefix sums with hash maps
 *
 * Given an array of integers nums and an integer k, return the total number of subarrays
 * whose sum equals to k.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - check all pairs (i, j)
// Space Complexity: O(1)
export function subarraySumBruteForce(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) count++;
    }
  }
  return count;
}

// --- 2. Optimal Approach (Prefix Sum + Frequency Hash Map) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(n) - stores prefix sum frequencies
// Key idea: prefixSum[j] - prefixSum[i] = k  =>  prefixSum[i] = prefixSum[j] - k
export function subarraySumOptimal(nums: number[], k: number): number {
  let count = 0;
  let currentSum = 0;
  const prefixMap = new Map<number, number>();
  // Base case: prefix sum 0 occurs once before traversing
  prefixMap.set(0, 1);

  for (const num of nums) {
    currentSum += num;
    const complement = currentSum - k;
    if (prefixMap.has(complement)) {
      count += prefixMap.get(complement)!;
    }
    prefixMap.set(currentSum, (prefixMap.get(currentSum) ?? 0) + 1);
  }

  return count;
}

// --- Test Verification ---
console.assert(subarraySumOptimal([1, 1, 1], 2) === 2, "Test 1 failed");
console.assert(subarraySumOptimal([1, 2, 3], 3) === 2, "Test 2 failed");
