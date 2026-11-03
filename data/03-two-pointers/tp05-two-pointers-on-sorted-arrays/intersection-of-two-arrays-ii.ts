/**
 * Problem: Intersection of Two Arrays II (LeetCode 350)
 * Difficulty: Easy
 * Pattern: TP5 - Two pointers on sorted arrays
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection with counts.
 */

// --- Optimal Approach (Sort + Two Pointers Scanning Both Arrays) ---
// Time Complexity: O(n log n + m log m)
// Space Complexity: O(1) extra space excluding result
export function intersect(nums1: number[], nums2: number[]): number[] {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  let p1 = 0, p2 = 0;
  const result: number[] = [];

  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] === nums2[p2]) {
      result.push(nums1[p1]);
      p1++;
      p2++;
    } else if (nums1[p1] < nums2[p2]) {
      p1++;
    } else {
      p2++;
    }
  }

  return result;
}

// --- Test Verification ---
const res = intersect([1, 2, 2, 1], [2, 2]);
console.assert(JSON.stringify(res) === JSON.stringify([2, 2]), "Test failed");
