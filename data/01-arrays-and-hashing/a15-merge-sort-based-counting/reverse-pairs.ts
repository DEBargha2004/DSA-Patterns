/**
 * Problem: Reverse Pairs (LeetCode 493)
 * Difficulty: Hard
 * Pattern: A15 - Merge-sort-based counting
 *
 * Given an integer array nums, return the number of reverse pairs in the array.
 * A reverse pair is a pair (i, j) where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - check all pairs
// Space Complexity: O(1)
export function reversePairsBruteForce(nums: number[]): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > 2 * nums[j]) count++;
    }
  }
  return count;
}

// --- 2. Optimal Approach (Divide and Conquer via Modified Merge Sort) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n) temporary buffer for merging
export function reversePairsOptimal(nums: number[]): number {
  function mergeAndCount(arr: number[], left: number, right: number): number {
    if (left >= right) return 0;

    const mid = Math.floor((left + right) / 2);
    let count = mergeAndCount(arr, left, mid) + mergeAndCount(arr, mid + 1, right);

    // Count reverse pairs across the two sorted halves
    let j = mid + 1;
    for (let i = left; i <= mid; i++) {
      while (j <= right && arr[i] > 2 * arr[j]) {
        j++;
      }
      count += j - (mid + 1);
    }

    // Standard merge
    const temp: number[] = [];
    let p1 = left;
    let p2 = mid + 1;
    while (p1 <= mid && p2 <= right) {
      if (arr[p1] <= arr[p2]) {
        temp.push(arr[p1++]);
      } else {
        temp.push(arr[p2++]);
      }
    }
    while (p1 <= mid) temp.push(arr[p1++]);
    while (p2 <= right) temp.push(arr[p2++]);

    for (let i = 0; i < temp.length; i++) {
      arr[left + i] = temp[i];
    }

    return count;
  }

  return mergeAndCount([...nums], 0, nums.length - 1);
}

// --- Test Verification ---
console.assert(reversePairsOptimal([1, 3, 2, 3, 1]) === 2, "Test 1 failed");
console.assert(reversePairsOptimal([2, 4, 3, 5, 1]) === 3, "Test 2 failed");
