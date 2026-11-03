/**
 * Problem: Smallest Range Covering Elements from K Lists (LeetCode 632)
 * Difficulty: Hard
 * Pattern: A20 - Coordinate compression / Multi-pointer
 *
 * You have k lists of sorted integers in non-decreasing order.
 * Find the smallest range [a, b] that includes at least one number from each of the k lists.
 */

// --- Optimal Approach (Coordinate Tagging + Sliding Window on Compressed Stream) ---
// Time Complexity: O(N log N) where N is total elements across all lists
// Space Complexity: O(N)
export function smallestRangeOptimal(nums: number[][]): [number, number] {
  type Point = { val: number; listIdx: number };
  const allPoints: Point[] = [];

  for (let i = 0; i < nums.length; i++) {
    for (const val of nums[i]) {
      allPoints.push({ val, listIdx: i });
    }
  }

  // Sort all values across all lists (compress timeline)
  allPoints.sort((a, b) => a.val - b.val);

  const k = nums.length;
  const countMap = new Map<number, number>();
  let matchedLists = 0;
  let left = 0;
  let bestRange: [number, number] = [-100000, 100000];

  for (let right = 0; right < allPoints.length; right++) {
    const rList = allPoints[right].listIdx;
    countMap.set(rList, (countMap.get(rList) ?? 0) + 1);
    if (countMap.get(rList) === 1) matchedLists++;

    // Contract window from left while containing all k lists
    while (matchedLists === k) {
      const currentStart = allPoints[left].val;
      const currentEnd = allPoints[right].val;

      if (currentEnd - currentStart < bestRange[1] - bestRange[0]) {
        bestRange = [currentStart, currentEnd];
      }

      const lList = allPoints[left].listIdx;
      countMap.set(lList, countMap.get(lList)! - 1);
      if (countMap.get(lList) === 0) matchedLists--;
      left++;
    }
  }

  return bestRange;
}

// --- Test Verification ---
const lists = [
  [4, 10, 15, 24, 26],
  [0, 9, 12, 20],
  [5, 18, 22, 30]
];
console.assert(JSON.stringify(smallestRangeOptimal(lists)) === JSON.stringify([20, 24]), "Test failed");
