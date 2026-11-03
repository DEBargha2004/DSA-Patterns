/**
 * Problem: Interval List Intersections (LeetCode 986)
 * Difficulty: Medium
 * Pattern: TP9 - Merging two sorted sequences
 *
 * Return the intersection of two closed interval lists firstList and secondList.
 */

// --- Optimal Approach (Two Pointers Scanning Sorted Interval Streams) ---
// Time Complexity: O(n + m)
// Space Complexity: O(1) auxiliary
export function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
  const result: number[][] = [];
  let i = 0, j = 0;

  while (i < firstList.length && j < secondList.length) {
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);

    if (start <= end) {
      result.push([start, end]);
    }

    if (firstList[i][1] < secondList[j][1]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

// --- Test Verification ---
const l1 = [[0, 2], [5, 10], [13, 23], [24, 25]];
const l2 = [[1, 5], [8, 12], [15, 24], [25, 26]];
const res = intervalIntersection(l1, l2);
console.assert(JSON.stringify(res) === JSON.stringify([[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]]), "Test failed");
