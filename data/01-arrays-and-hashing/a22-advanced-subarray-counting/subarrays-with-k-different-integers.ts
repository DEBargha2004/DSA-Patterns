/**
 * Problem: Subarrays with K Different Integers (LeetCode 992)
 * Difficulty: Hard
 * Pattern: A22 - Advanced subarray counting
 *
 * Given an integer array nums and an integer k, return the number of good subarrays of nums.
 * A good array is an array where the number of different integers in that array is exactly k.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function subarraysWithKDistinctBruteForce(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const set = new Set<number>();
    for (let j = i; j < nums.length; j++) {
      set.add(nums[j]);
      if (set.size === k) count++;
      if (set.size > k) break;
    }
  }
  return count;
}

// --- 2. Optimal Approach (Exact K = AtMost(K) - AtMost(K - 1)) ---
// Time Complexity: O(n) - two sliding window passes
// Space Complexity: O(k) for frequency map
// Reduction principle:
// Count(exactly k) = Count(at most k) - Count(at most k - 1)
export function subarraysWithKDistinctOptimal(nums: number[], k: number): number {
  function atMostK(limit: number): number {
    if (limit <= 0) return 0;
    const freq = new Map<number, number>();
    let left = 0;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
      const num = nums[right];
      freq.set(num, (freq.get(num) ?? 0) + 1);

      while (freq.size > limit) {
        const lNum = nums[left];
        freq.set(lNum, freq.get(lNum)! - 1);
        if (freq.get(lNum) === 0) {
          freq.delete(lNum);
        }
        left++;
      }

      // Every valid window ending at `right` has (right - left + 1) subarrays
      count += right - left + 1;
    }

    return count;
  }

  return atMostK(k) - atMostK(k - 1);
}

// --- Test Verification ---
console.assert(subarraysWithKDistinctOptimal([1, 2, 1, 2, 3], 2) === 7, "Test 1 failed");
console.assert(subarraysWithKDistinctOptimal([1, 2, 1, 3, 4], 3) === 3, "Test 2 failed");
