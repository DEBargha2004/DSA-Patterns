/**
 * Problem: Rotate Image (LeetCode 48)
 * Difficulty: Medium
 * Pattern: A18 - Matrix traversal and transformation
 *
 * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.
 */

// --- 1. Brute Force Approach (Extra Auxiliary Matrix) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n^2) - violates in-place requirement
export function rotateImageBruteForce(matrix: number[][]): void {
  const n = matrix.length;
  const temp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      temp[c][n - 1 - r] = matrix[r][c];
    }
  }

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      matrix[r][c] = temp[r][c];
    }
  }
}

// --- 2. Optimal Approach (Transpose Matrix + Reverse Rows) ---
// Time Complexity: O(n^2)
// Space Complexity: O(1) in-place
// Mathematical property:
// 90 deg clockwise rotation = Transpose matrix (swap matrix[i][j] with matrix[j][i]) + Reverse each row.
export function rotateImageOptimal(matrix: number[][]): void {
  const n = matrix.length;

  // Step 1: Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = n - 1;
    while (left < right) {
      const temp = matrix[i][left];
      matrix[i][left] = matrix[i][right];
      matrix[i][right] = temp;
      left++;
      right--;
    }
  }
}

// --- Test Verification ---
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
rotateImageOptimal(grid);
console.assert(JSON.stringify(grid) === JSON.stringify([[7, 4, 1], [8, 5, 2], [9, 6, 3]]), "Test failed");
