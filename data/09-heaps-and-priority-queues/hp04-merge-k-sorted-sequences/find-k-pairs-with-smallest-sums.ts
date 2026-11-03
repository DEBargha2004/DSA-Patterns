/**
 * Problem: Find K Pairs with Smallest Sums (LeetCode 373)
 * Difficulty: Medium
 * Pattern: HP4 - Merge K sorted sequences
 *
 * Find k pairs (u, v) with smallest sum u + v from sorted arrays nums1 and nums2.
 */

// --- Optimal Approach (Min-Heap of size k) ---
// Time Complexity: O(k log k)
// Space Complexity: O(k)
export function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const result: number[][] = [];
  if (nums1.length === 0 || nums2.length === 0 || k === 0) return result;

  // Heap items: [nums1[i] + nums2[j], i, j]
  const heap: [sum: number, i: number, j: number][] = [];
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  while (heap.length > 0 && result.length < k) {
    heap.sort((a, b) => a[0] - b[0]);
    const [, i, j] = heap.shift()!;
    result.push([nums1[i], nums2[j]]);

    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }

  return result;
}

// --- Test Verification ---
const r = kSmallestPairs([1, 7, 11], [2, 4, 6], 3);
console.assert(JSON.stringify(r) === JSON.stringify([[1, 2], [1, 4], [1, 6]]), "Test 1 failed");
