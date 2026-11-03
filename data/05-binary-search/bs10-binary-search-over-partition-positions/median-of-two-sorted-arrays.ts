/**
 * Problem: Median of Two Sorted Arrays (LeetCode 4)
 * Difficulty: Hard
 * Pattern: BS10 - Binary search over partition positions
 *
 * Find median of two sorted arrays nums1 and nums2 in O(log(min(m, n))).
 */

// --- Optimal Approach (Binary Search over Partition of Smaller Array) ---
// Time Complexity: O(log(min(m, n)))
// Space Complexity: O(1)
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }

  return 0.0;
}

// --- Test Verification ---
console.assert(findMedianSortedArrays([1, 3], [2]) === 2.0, "Test 1 failed");
console.assert(findMedianSortedArrays([1, 2], [3, 4]) === 2.5, "Test 2 failed");
