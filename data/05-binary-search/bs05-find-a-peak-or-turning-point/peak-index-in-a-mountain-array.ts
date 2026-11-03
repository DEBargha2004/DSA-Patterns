/**
 * Problem: Peak Index in a Mountain Array (LeetCode 852)
 * Difficulty: Medium
 * Pattern: BS5 - Find a peak or turning point
 *
 * Given mountain array arr, return index i such that arr[0] < ... < arr[i] > ... > arr[n - 1].
 */

// --- Optimal Approach (Binary Search Mountain Peak) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function peakIndexInMountainArray(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// --- Test Verification ---
console.assert(peakIndexInMountainArray([0, 1, 0]) === 1, "Test 1 failed");
console.assert(peakIndexInMountainArray([0, 2, 1, 0]) === 1, "Test 2 failed");
console.assert(peakIndexInMountainArray([0, 10, 5, 2]) === 1, "Test 3 failed");
