/**
 * Problem: Find in Mountain Array (LeetCode 1095)
 * Difficulty: Hard
 * Pattern: BS5 - Find a peak or turning point
 *
 * Find target in mountain array with minimum API calls.
 */

export interface MountainArray {
  get(index: number): number;
  length(): number;
}

// --- Optimal Approach (Find Peak + Two Binary Searches) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function findInMountainArray(target: number, mountainArr: MountainArray): number {
  const n = mountainArr.length();

  // 1. Find Peak Index
  let left = 0, right = n - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  const peak = left;

  // 2. Binary search ascending left slope
  left = 0; right = peak;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const val = mountainArr.get(mid);
    if (val === target) return mid;
    else if (val < target) left = mid + 1;
    else right = mid - 1;
  }

  // 3. Binary search descending right slope
  left = peak + 1; right = n - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const val = mountainArr.get(mid);
    if (val === target) return mid;
    else if (val > target) left = mid + 1; // Decreasing order!
    else right = mid - 1;
  }

  return -1;
}

// --- Test Verification ---
const mockMountain: MountainArray = {
  arr: [1, 2, 3, 4, 5, 3, 1],
  get(i: number) { return this.arr[i]; },
  length() { return this.arr.length; }
} as any;
console.assert(findInMountainArray(3, mockMountain) === 2, "Test 1 failed");
