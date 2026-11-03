/**
 * Problem: Search a 2D Matrix (LeetCode 74)
 * Difficulty: Medium
 * Pattern: BS8 - Search in a two-dimensional matrix
 *
 * Integers in each row are sorted from left to right; first integer of each row > last of previous row.
 */

// --- Optimal Approach (Treat Matrix as Flattened 1D Array of Size m * n) ---
// Time Complexity: O(log(m * n))
// Space Complexity: O(1)
export function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const r = Math.floor(mid / n);
    const c = mid % n;
    const val = matrix[r][c];

    if (val === target) return true;
    else if (val < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}

// --- Test Verification ---
const mat1 = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
];
console.assert(searchMatrix(mat1, 3) === true, "Test 1 failed");
console.assert(searchMatrix(mat1, 13) === false, "Test 2 failed");
