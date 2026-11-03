/**
 * Problem: Kth Element of Two Sorted Arrays
 * Difficulty: Hard
 * Pattern: BS10 - Binary search over partition positions
 *
 * Find kth element of two sorted arrays in O(log(min(m, n))) time.
 */

// --- Optimal Approach (Binary Search Partition) ---
// Time Complexity: O(log(min(m, n)))
// Space Complexity: O(1)
export function findKthElement(nums1: number[], nums2: number[], k: number): number {
  if (nums1.length > nums2.length) return findKthElement(nums2, nums1, k);

  const m = nums1.length, n = nums2.length;
  let left = Math.max(0, k - n);
  let right = Math.min(k, m);

  while (left <= right) {
    const cut1 = Math.floor((left + right) / 2);
    const cut2 = k - cut1;

    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const r1 = cut1 === m ? Infinity : nums1[cut1];

    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r2 = cut2 === n ? Infinity : nums2[cut2];

    if (l1 <= r2 && l2 <= r1) {
      return Math.max(l1, l2);
    } else if (l1 > r2) {
      right = cut1 - 1;
    } else {
      left = cut1 + 1;
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(findKthElement([2, 3, 6, 7, 9], [1, 4, 8, 10], 5) === 6, "Test failed");
