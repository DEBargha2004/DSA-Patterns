/**
 * Problem: Canonical Exponential Search
 * Difficulty: Medium
 * Pattern: BS11 - Exponential search followed by binary search
 *
 * Find target in unbounded / large sorted array.
 */

// --- Optimal Approach (Exponential Search + Sliced Binary Search) ---
// Time Complexity: O(log i) where i is target index
// Space Complexity: O(1)
export function exponentialSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (n === 0) return -1;
  if (arr[0] === target) return 0;

  let bound = 1;
  while (bound < n && arr[bound] <= target) {
    bound *= 2;
  }

  let left = Math.floor(bound / 2);
  let right = Math.min(bound, n - 1);

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// --- Test Verification ---
console.assert(exponentialSearch([2, 3, 4, 10, 40], 10) === 3, "Test 1 failed");
console.assert(exponentialSearch([2, 3, 4, 10, 40], 50) === -1, "Test 2 failed");
