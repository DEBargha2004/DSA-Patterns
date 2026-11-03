/**
 * Problem: Top K Frequent Elements (LeetCode 347)
 * Difficulty: Medium
 * Pattern: A21 - Quickselect and order statistics
 *
 * Given an integer array nums and an integer k, return the k most frequent elements.
 */

// --- 1. Brute Force Approach (Sort Frequency Map) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function topKFrequentSort(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const x of nums) freqMap.set(x, (freqMap.get(x) ?? 0) + 1);

  return Array.from(freqMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((e) => e[0]);
}

// --- 2. Optimal Approach (Bucket Sort - O(n) Time) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
// Since frequencies can never exceed n, place elements into frequency buckets 1..n.
export function topKFrequentOptimal(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const x of nums) freqMap.set(x, (freqMap.get(x) ?? 0) + 1);

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

  for (const [val, freq] of freqMap.entries()) {
    buckets[freq].push(val);
  }

  const result: number[] = [];
  for (let f = buckets.length - 1; f >= 0 && result.length < k; f--) {
    for (const val of buckets[f]) {
      result.push(val);
      if (result.length === k) break;
    }
  }

  return result;
}

// --- Test Verification ---
const res = topKFrequentOptimal([1, 1, 1, 2, 2, 3], 2);
console.assert(JSON.stringify(res.sort((a, b) => a - b)) === JSON.stringify([1, 2]), "Test failed");
