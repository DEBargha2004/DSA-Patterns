/**
 * Problem: Kth Largest Element in an Array (LeetCode 215)
 * Difficulty: Medium
 * Pattern: A21 - Quickselect and order statistics
 *
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 */

// --- 1. Brute Force Approach (Sort) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1) or O(n)
export function findKthLargestSort(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}

// --- 2. Optimal Approach (Randomized Quickselect) ---
// Time Complexity: O(n) average, O(n^2) worst-case (mitigated by randomized pivot)
// Space Complexity: O(1) in-place auxiliary space
export function findKthLargestOptimal(nums: number[], k: number): number {
  // Target index in 0-indexed ascending order
  const targetIdx = nums.length - k;

  function partition(left: number, right: number, pivotIdx: number): number {
    const pivotVal = nums[pivotIdx];
    // Move pivot to end
    [nums[pivotIdx], nums[right]] = [nums[right], nums[pivotIdx]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
      if (nums[i] < pivotVal) {
        [nums[storeIdx], nums[i]] = [nums[i], nums[storeIdx]];
        storeIdx++;
      }
    }

    // Move pivot to its final sorted place
    [nums[right], nums[storeIdx]] = [nums[storeIdx], nums[right]];
    return storeIdx;
  }

  function quickSelect(left: number, right: number): number {
    if (left === right) return nums[left];

    // Randomized pivot selection
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const sortedPivotIdx = partition(left, right, pivotIdx);

    if (sortedPivotIdx === targetIdx) {
      return nums[sortedPivotIdx];
    } else if (sortedPivotIdx < targetIdx) {
      return quickSelect(sortedPivotIdx + 1, right);
    } else {
      return quickSelect(left, sortedPivotIdx - 1);
    }
  }

  return quickSelect(0, nums.length - 1);
}

// --- Test Verification ---
console.assert(findKthLargestOptimal([3, 2, 1, 5, 6, 4], 2) === 5, "Test 1 failed");
console.assert(findKthLargestOptimal([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) === 4, "Test 2 failed");
