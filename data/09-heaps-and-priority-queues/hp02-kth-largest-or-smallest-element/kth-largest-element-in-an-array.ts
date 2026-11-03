/**
 * Problem: Kth Largest Element in an Array (LeetCode 215)
 * Difficulty: Medium
 * Pattern: HP2 - Kth largest or smallest element
 *
 * Find kth largest element in unsorted array.
 */

// --- Brute Force Approach (Full Sort) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1)
export function findKthLargestBrute(nums: number[], k: number): number {
  return [...nums].sort((a, b) => b - a)[k - 1];
}

// --- Optimal Approach (QuickSelect - O(n) average) ---
// Time Complexity: O(n) average, O(n^2) worst case
// Space Complexity: O(1) auxiliary
export function findKthLargest(nums: number[], k: number): number {
  const targetIdx = nums.length - k; // kth largest is (n - k)-th smallest

  function quickSelect(left: number, right: number): number {
    const pivot = nums[right];
    let pIdx = left;

    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[pIdx]] = [nums[pIdx], nums[i]];
        pIdx++;
      }
    }
    [nums[pIdx], nums[right]] = [nums[right], nums[pIdx]];

    if (pIdx === targetIdx) return nums[pIdx];
    if (pIdx < targetIdx) return quickSelect(pIdx + 1, right);
    return quickSelect(left, pIdx - 1);
  }

  return quickSelect(0, nums.length - 1);
}

// --- Test Verification ---
console.assert(findKthLargestBrute([3, 2, 1, 5, 6, 4], 2) === 5, "Brute failed");
console.assert(findKthLargest([3, 2, 1, 5, 6, 4], 2) === 5, "Optimal 1 failed");
console.assert(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) === 4, "Optimal 2 failed");
