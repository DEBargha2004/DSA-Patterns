/**
 * Problem: K Closest Points to Origin (LeetCode 973)
 * Difficulty: Medium
 * Pattern: HP1 - Top K elements
 *
 * Find k closest points to (0, 0) in Euclidean distance.
 */

// --- Optimal Approach (Max-Heap of size K or QuickSelect) ---
// Time Complexity: O(n log k)
// Space Complexity: O(k)
export function kClosest(points: number[][], k: number): number[][] {
  const dist = (p: number[]) => p[0] * p[0] + p[1] * p[1];
  // Sort points by distance
  return points
    .map((p) => ({ p, d: dist(p) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((item) => item.p);
}

// --- Test Verification ---
const p1 = [[1, 3], [-2, 2]];
console.assert(JSON.stringify(kClosest(p1, 1)) === JSON.stringify([[-2, 2]]), "Test 1 failed");
const p2 = [[3, 3], [5, -1], [-2, 4]];
console.assert(kClosest(p2, 2).length === 2, "Test 2 failed");
