/**
 * Problem: Smallest Range Covering Elements from K Lists (LeetCode 632)
 * Difficulty: Hard
 * Pattern: HP10 - K-way merge
 *
 * Find smallest range [a, b] containing at least one number from each of k sorted lists.
 */

// --- Optimal Approach (Min-Heap of Pointers + Current Maximum Tracking) ---
// Time Complexity: O(n log k) where n is total elements
// Space Complexity: O(k)
export function smallestRange(nums: number[][]): number[] {
  // Heap stores: [val, listIndex, elementIndex]
  const heap: [val: number, listIdx: number, elemIdx: number][] = [];
  let currentMax = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    heap.push([nums[i][0], i, 0]);
    currentMax = Math.max(currentMax, nums[i][0]);
  }

  let rangeStart = 0;
  let rangeEnd = Infinity;

  while (heap.length === nums.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [minVal, listIdx, elemIdx] = heap.shift()!;

    if (currentMax - minVal < rangeEnd - rangeStart) {
      rangeStart = minVal;
      rangeEnd = currentMax;
    }

    if (elemIdx + 1 < nums[listIdx].length) {
      const nextVal = nums[listIdx][elemIdx + 1];
      heap.push([nextVal, listIdx, elemIdx + 1]);
      currentMax = Math.max(currentMax, nextVal);
    }
  }

  return [rangeStart, rangeEnd];
}

// --- Test Verification ---
const lists = [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]];
console.assert(JSON.stringify(smallestRange(lists)) === JSON.stringify([20, 24]), "Test 1 failed");
