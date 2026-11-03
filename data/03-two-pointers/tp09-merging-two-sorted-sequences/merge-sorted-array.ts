/**
 * Problem: Merge Sorted Array (LeetCode 88)
 * Difficulty: Easy
 * Pattern: TP9 - Merging two sorted sequences
 *
 * Merge nums2 into nums1 as one sorted array in-place from the end.
 */

// --- Optimal Approach (Three Pointers from the Back) ---
// Time Complexity: O(m + n)
// Space Complexity: O(1) in-place
export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;
  let write = m + n - 1;

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[write--] = nums1[p1--];
    } else {
      nums1[write--] = nums2[p2--];
    }
  }
}

// --- Test Verification ---
const a1 = [1, 2, 3, 0, 0, 0];
merge(a1, 3, [2, 5, 6], 3);
console.assert(JSON.stringify(a1) === JSON.stringify([1, 2, 2, 3, 5, 6]), "Test failed");
