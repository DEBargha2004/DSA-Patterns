/**
 * Problem: Intersection of Two Arrays (LeetCode 349)
 * Difficulty: Easy
 * Pattern: A2 - Hash map/set lookup
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection.
 * Each element in the result must be unique and you may return the result in any order.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n * m)
// Space Complexity: O(min(n, m)) for unique result
export function intersectionBruteForce(nums1: number[], nums2: number[]): number[] {
  const result: number[] = [];
  for (const a of nums1) {
    if (nums2.includes(a) && !result.includes(a)) {
      result.push(a);
    }
  }
  return result;
}

// --- 2. Optimal Approach (Hash Set Lookup) ---
// Time Complexity: O(n + m)
// Space Complexity: O(n) to store set of first array
export function intersectionOptimal(nums1: number[], nums2: number[]): number[] {
  const set1 = new Set<number>(nums1);
  const resultSet = new Set<number>();

  for (const num of nums2) {
    if (set1.has(num)) {
      resultSet.add(num);
    }
  }

  return Array.from(resultSet);
}

// --- Test Verification ---
const res = intersectionOptimal([1, 2, 2, 1], [2, 2]);
console.assert(JSON.stringify(res) === JSON.stringify([2]), "Test failed");
