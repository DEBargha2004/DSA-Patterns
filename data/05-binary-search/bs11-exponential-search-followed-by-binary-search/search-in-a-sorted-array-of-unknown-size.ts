/**
 * Problem: Search in a Sorted Array of Unknown Size (LeetCode 702)
 * Difficulty: Medium
 * Pattern: BS11 - Exponential search followed by binary search
 *
 * Find target in an infinite sorted array using reader.get(k) API.
 */

export interface ArrayReader {
  get(index: number): number;
}

// --- Optimal Approach (Exponential Range Expansion + Binary Search) ---
// Time Complexity: O(log T) where T is target index
// Space Complexity: O(1)
export function searchUnknownSize(reader: ArrayReader, target: number): number {
  // Step 1: Exponential search to find boundaries
  let left = 0;
  let right = 1;

  while (reader.get(right) < target) {
    left = right;
    right <<= 1; // Multiply by 2
  }

  // Step 2: Standard binary search within [left, right]
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const val = reader.get(mid);
    if (val === target) return mid;
    else if (val < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// --- Test Verification ---
const mockReader: ArrayReader = {
  arr: [-1, 0, 3, 5, 9, 12],
  get(i: number) { return i < this.arr.length ? this.arr[i] : 2147483647; }
} as any;
console.assert(searchUnknownSize(mockReader, 9) === 4, "Test 1 failed");
console.assert(searchUnknownSize(mockReader, 2) === -1, "Test 2 failed");
