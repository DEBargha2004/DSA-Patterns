/**
 * Pattern: Randomized algorithms
 * Problem: Kth Largest Element in an Array (LeetCode 215) - Quickselect
 */

// Brute Force: Full sorting
// Time: O(N log N), Space: O(1)
export function findKthLargestSort(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}

// Optimal: Randomized Quickselect (Hoare's Selection Algorithm)
// Time: O(N) average, Space: O(1) auxiliary
export function findKthLargestQuickselect(nums: number[], k: number): number {
  const targetIdx = nums.length - k; // Convert kth largest to (n - k)-th smallest

  function quickselect(left: number, right: number): number {
    if (left === right) return nums[left];

    // Pick random pivot
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const pivotVal = nums[pivotIdx];
    [nums[pivotIdx], nums[right]] = [nums[right], nums[pivotIdx]];

    let storeIdx = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivotVal) {
        [nums[storeIdx], nums[i]] = [nums[i], nums[storeIdx]];
        storeIdx++;
      }
    }
    [nums[storeIdx], nums[right]] = [nums[right], nums[storeIdx]];

    if (storeIdx === targetIdx) return nums[storeIdx];
    else if (storeIdx < targetIdx) return quickselect(storeIdx + 1, right);
    else return quickselect(left, storeIdx - 1);
  }

  return quickselect(0, nums.length - 1);
}

// Test cases
const qkNums = [3, 2, 1, 5, 6, 4];
if (findKthLargestSort([...qkNums], 2) !== 5 || findKthLargestQuickselect([...qkNums], 2) !== 5) {
  throw new Error("Expected 5");
}
console.log("Kth Largest Element Quickselect passed!");
