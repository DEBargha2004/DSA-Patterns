/**
 * Problem: Search a 2D Matrix II (LeetCode 240)
 * Difficulty: Medium
 * Pattern: BS8 - Search in a two-dimensional matrix
 *
 * Integers in each row are sorted in ascending from left to right; integers in each col sorted ascending top to bottom.
 */

// --- Optimal Approach (Search from Top-Right Corner - O(m + n)) ---
// Time Complexity: O(m + n)
// Space Complexity: O(1)
export function searchMatrixII(matrix: number[][], target: number): boolean {
  let r = 0;
  let c = matrix[0].length - 1;

  while (r < matrix.length && c >= 0) {
    const val = matrix[r][c];
    if (val === target) return true;
    else if (val > target) c--;
    else r++;
  }

  return false;
}

// --- Test Verification ---
const mat2 = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
];
console.assert(searchMatrixII(mat2, 5) === true, "Test 1 failed");
console.assert(searchMatrixII(mat2, 20) === false, "Test 2 failed");
