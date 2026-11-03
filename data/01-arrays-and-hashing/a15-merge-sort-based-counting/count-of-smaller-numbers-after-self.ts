/**
 * Problem: Count of Smaller Numbers After Self (LeetCode 315)
 * Difficulty: Hard
 * Pattern: A15 - Merge-sort-based counting
 *
 * Given an integer array nums, return an integer array counts where counts[i] is the number
 * of smaller elements to the right of nums[i].
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1) excluding output
export function countSmallerBruteForce(nums: number[]): number[] {
  const result: number[] = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        result[i]++;
      }
    }
  }
  return result;
}

// --- 2. Optimal Approach (Merge Sort with Index Tracking) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function countSmallerOptimal(nums: number[]): number[] {
  const n = nums.length;
  const counts = new Array<number>(n).fill(0);
  // Pair: [value, originalIndex]
  let items = nums.map((val, idx) => ({ val, idx }));

  function mergeSort(arr: { val: number; idx: number }[]): { val: number; idx: number }[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const merged: { val: number; idx: number }[] = [];
    let p1 = 0;
    let p2 = 0;
    let rightCounter = 0;

    while (p1 < left.length && p2 < right.length) {
      if (right[p2].val < left[p1].val) {
        rightCounter++;
        merged.push(right[p2++]);
      } else {
        counts[left[p1].idx] += rightCounter;
        merged.push(left[p1++]);
      }
    }

    while (p1 < left.length) {
      counts[left[p1].idx] += rightCounter;
      merged.push(left[p1++]);
    }

    while (p2 < right.length) {
      merged.push(right[p2++]);
    }

    return merged;
  }

  mergeSort(items);
  return counts;
}

// --- Test Verification ---
console.assert(JSON.stringify(countSmallerOptimal([5, 2, 6, 1])) === JSON.stringify([2, 1, 1, 0]), "Test failed");
