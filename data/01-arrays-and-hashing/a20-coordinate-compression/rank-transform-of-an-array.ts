/**
 * Problem: Rank Transform of an Array (LeetCode 1331)
 * Difficulty: Easy
 * Pattern: A20 - Coordinate compression
 *
 * Given an array of integers arr, replace each element with its rank (1-indexed relative ordering).
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - count unique elements strictly less than arr[i]
// Space Complexity: O(n)
export function arrayRankTransformBruteForce(arr: number[]): number[] {
  return arr.map((x) => {
    const smallerUnique = new Set<number>();
    for (const y of arr) {
      if (y < x) smallerUnique.add(y);
    }
    return smallerUnique.size + 1;
  });
}

// --- 2. Optimal Approach (Coordinate Compression via Sort + Map) ---
// Time Complexity: O(n log n) - sorting unique elements
// Space Complexity: O(n)
// Maps large/arbitrary numbers into compact discrete ranks [1..k].
export function arrayRankTransformOptimal(arr: number[]): number[] {
  const sortedUnique = Array.from(new Set(arr)).sort((a, b) => a - b);
  const rankMap = new Map<number, number>();

  for (let i = 0; i < sortedUnique.length; i++) {
    rankMap.set(sortedUnique[i], i + 1);
  }

  return arr.map((x) => rankMap.get(x)!);
}

// --- Test Verification ---
console.assert(JSON.stringify(arrayRankTransformOptimal([40, 10, 20, 30])) === JSON.stringify([4, 1, 2, 3]), "Test 1 failed");
console.assert(JSON.stringify(arrayRankTransformOptimal([100, 100, 100])) === JSON.stringify([1, 1, 1]), "Test 2 failed");
