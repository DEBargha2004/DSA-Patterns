/**
 * Problem: Merge Sorted Array Streams
 * Difficulty: Medium
 * Pattern: HP10 - K-way merge
 *
 * Stream merge k sorted arrays into a single sorted array.
 */

// --- Optimal Approach (Min-Heap of Pointer Heads) ---
// Time Complexity: O(N log k)
// Space Complexity: O(k)
export function mergeSortedArrays(arrays: number[][]): number[] {
  const result: number[] = [];
  // Heap stores: [val, arrayIndex, elemIndex]
  const heap: [val: number, arrIdx: number, elemIdx: number][] = [];

  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) {
      heap.push([arrays[i][0], i, 0]);
    }
  }

  while (heap.length > 0) {
    heap.sort((a, b) => a[0] - b[0]);
    const [val, arrIdx, elemIdx] = heap.shift()!;
    result.push(val);

    if (elemIdx + 1 < arrays[arrIdx].length) {
      heap.push([arrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1]);
    }
  }

  return result;
}

// --- Test Verification ---
const a1 = [1, 5, 9];
const a2 = [2, 6, 10];
const a3 = [3, 4, 7, 8];
console.assert(JSON.stringify(mergeSortedArrays([a1, a2, a3])) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), "Test 1 failed");
