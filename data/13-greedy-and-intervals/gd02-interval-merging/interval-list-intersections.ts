/**
 * Pattern: Interval merging
 * Problem: Interval List Intersections (LeetCode 986)
 *
 * Given two lists of closed intervals firstList and secondList where each list is
 * pairwise disjoint and in sorted order, return the intersection of these two interval lists.
 */

// Brute Force: Compare every pair of intervals across both lists
// Time: O(M * N), Space: O(M + N)
export function intervalIntersectionBrute(firstList: number[][], secondList: number[][]): number[][] {
  const result: number[][] = [];
  for (const a of firstList) {
    for (const b of secondList) {
      const start = Math.max(a[0], b[0]);
      const end = Math.min(a[1], b[1]);
      if (start <= end) {
        result.push([start, end]);
      }
    }
  }
  return result;
}

// Optimal: Two Pointers Advance (Advance the pointer whose interval ends first)
// Time: O(M + N), Space: O(1) auxiliary
export function intervalIntersectionOptimal(firstList: number[][], secondList: number[][]): number[][] {
  let i = 0, j = 0;
  const result: number[][] = [];

  while (i < firstList.length && j < secondList.length) {
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);

    if (start <= end) {
      result.push([start, end]);
    }

    // Advance interval with smaller end time
    if (firstList[i][1] < secondList[j][1]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

// Test cases
const l1 = [[0,2],[5,10],[13,23],[24,25]];
const l2 = [[1,5],[8,12],[15,24],[25,26]];
const rInt1 = intervalIntersectionBrute(l1, l2);
const rInt2 = intervalIntersectionOptimal(l1, l2);
if (JSON.stringify(rInt1) !== JSON.stringify(rInt2) || rInt2.length !== 6) {
  throw new Error("Mismatch in interval intersections");
}
console.log("Interval List Intersections passed!");
