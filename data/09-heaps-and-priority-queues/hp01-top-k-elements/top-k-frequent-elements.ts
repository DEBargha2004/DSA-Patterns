/**
 * Problem: Top K Frequent Elements (LeetCode 347)
 * Difficulty: Medium
 * Pattern: HP1 - Top K elements
 *
 * Return the k most frequent elements in array.
 */

// --- Brute Force Approach (Sort Frequency Map) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function topKFrequentBrute(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((e) => e[0]);
}

// --- Optimal Approach (Min-Heap / Bucket Sort - O(n)) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of counts.entries()) {
    buckets[freq].push(num);
  }

  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k);
}

// --- Test Verification ---
const r1 = topKFrequent([1, 1, 1, 2, 2, 3], 2);
console.assert(r1.includes(1) && r1.includes(2) && r1.length === 2, "Test 1 failed");
console.assert(JSON.stringify(topKFrequent([1], 1)) === JSON.stringify([1]), "Test 2 failed");
