/**
 * Problem: Set Matrix Zeroes (LeetCode 73)
 * Difficulty: Medium
 * Pattern: A18 - Matrix traversal and transformation
 *
 * Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's in-place.
 */

// --- 1. Brute Force Approach (Duplicate Matrix) ---
// Time Complexity: O(m * n * (m + n))
// Space Complexity: O(m * n)
export function setZeroesBruteForce(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;
  const copy = matrix.map((row) => [...row]);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 0) {
        for (let col = 0; col < n; col++) matrix[r][col] = 0;
        for (let row = 0; row < m; row++) matrix[row][c] = 0;
      }
    }
  }
}

// --- 2. Better Approach (Auxiliary Row and Col Flag Arrays) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m + n)
export function setZeroesBetter(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;
  const zeroRows = new Set<number>();
  const zeroCols = new Set<number>();

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === 0) {
        zeroRows.add(r);
        zeroCols.add(c);
      }
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (zeroRows.has(r) || zeroCols.has(c)) {
        matrix[r][c] = 0;
      }
    }
  }
}

// --- 3. Optimal Approach (O(1) Space using First Row & First Column as Markers) ---
// Time Complexity: O(m * n)
// Space Complexity: O(1) in-place
export function setZeroesOptimal(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;
  let firstColZero = false;

  for (let r = 0; r < m; r++) {
    if (matrix[r][0] === 0) firstColZero = true;
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  // Backwards traversal to avoid overwriting marker state early
  for (let r = m - 1; r >= 0; r--) {
    for (let c = n - 1; c >= 1; c--) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) {
        matrix[r][c] = 0;
      }
    }
    if (firstColZero) {
      matrix[r][0] = 0;
    }
  }
}

// --- Test Verification ---
const testMatrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];
setZeroesOptimal(testMatrix);
console.assert(JSON.stringify(testMatrix) === JSON.stringify([[1, 0, 1], [0, 0, 0], [1, 0, 1]]), "Test failed");
