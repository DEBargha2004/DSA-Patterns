/**
 * Problem: Maximum Subsequence Score (LeetCode 2542)
 * Difficulty: Medium
 * Pattern: HP8 - Lazy deletion in heaps
 *
 * Find max score = sum(nums1[sub]) * min(nums2[sub]) of length k.
 */

// --- Optimal Approach (Sorted nums2 descending + Min-Heap of size k for nums1) ---
// Time Complexity: O(n log n + n log k)
// Space Complexity: O(n)
export function maxScore(nums1: number[], nums2: number[], k: number): number {
  const n = nums1.length;
  const pairs = nums1.map((n1, i) => ({ n1, n2: nums2[i] }));
  pairs.sort((a, b) => b.n2 - a.n2); // sort by n2 descending

  const heap: number[] = [];
  let sum = 0;
  let maxResult = 0;

  for (const { n1, n2 } of pairs) {
    heap.push(n1);
    heap.sort((a, b) => a - b);
    sum += n1;

    if (heap.length > k) {
      sum -= heap.shift()!;
    }

    if (heap.length === k) {
      maxResult = Math.max(maxResult, sum * n2);
    }
  }

  return maxResult;
}

// --- Test Verification ---
console.assert(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3) === 12, "Test 1 failed");
console.assert(maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1) === 30, "Test 2 failed");
