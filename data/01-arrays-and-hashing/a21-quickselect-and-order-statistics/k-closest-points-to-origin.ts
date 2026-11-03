/**
 * Problem: K Closest Points to Origin (LeetCode 973)
 * Difficulty: Medium
 * Pattern: A21 - Quickselect and order statistics
 *
 * Given an array of points where points[i] = [xi, yi] and an integer k,
 * return the k closest points to the origin (0, 0).
 */

// --- 1. Brute Force Approach (Sort by Euclidean Distance) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function kClosestSort(points: number[][], k: number): number[][] {
  const dist = (p: number[]) => p[0] * p[0] + p[1] * p[1];
  return points.sort((a, b) => dist(a) - dist(b)).slice(0, k);
}

// --- 2. Optimal Approach (Quickselect In-Place) ---
// Time Complexity: O(n) average
// Space Complexity: O(1) auxiliary
export function kClosestOptimal(points: number[][], k: number): number[][] {
  const dist = (p: number[]) => p[0] * p[0] + p[1] * p[1];

  function partition(left: number, right: number, pivotIdx: number): number {
    const pivotDist = dist(points[pivotIdx]);
    [points[pivotIdx], points[right]] = [points[right], points[pivotIdx]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
      if (dist(points[i]) < pivotDist) {
        [points[storeIdx], points[i]] = [points[i], points[storeIdx]];
        storeIdx++;
      }
    }

    [points[right], points[storeIdx]] = [points[storeIdx], points[right]];
    return storeIdx;
  }

  function quickSelect(left: number, right: number): void {
    if (left >= right) return;

    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const sortedPivotIdx = partition(left, right, pivotIdx);

    if (sortedPivotIdx === k) {
      return;
    } else if (sortedPivotIdx < k) {
      quickSelect(sortedPivotIdx + 1, right);
    } else {
      quickSelect(left, sortedPivotIdx - 1);
    }
  }

  quickSelect(0, points.length - 1);
  return points.slice(0, k);
}

// --- Test Verification ---
const points = [[1, 3], [-2, 2]];
const closest = kClosestOptimal(points, 1);
console.assert(JSON.stringify(closest) === JSON.stringify([[-2, 2]]), "Test failed");
