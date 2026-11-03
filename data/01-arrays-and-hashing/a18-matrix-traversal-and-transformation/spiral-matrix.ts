/**
 * Problem: Spiral Matrix (LeetCode 54)
 * Difficulty: Medium
 * Pattern: A18 - Matrix traversal and transformation
 *
 * Given an m x n matrix, return all elements of the matrix in spiral order.
 */

// --- 1. Brute Force Approach (Visited Matrix Simulation) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n) auxiliary visited boolean matrix
export function spiralOrderSimulation(matrix: number[][]): number[] {
  if (matrix.length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
  const result: number[] = [];

  // Directions: Right, Down, Left, Up
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let r = 0;
  let c = 0;
  let dir = 0;

  for (let i = 0; i < m * n; i++) {
    result.push(matrix[r][c]);
    visited[r][c] = true;

    const nextR = r + dr[dir];
    const nextC = c + dc[dir];

    if (nextR >= 0 && nextR < m && nextC >= 0 && nextC < n && !visited[nextR][nextC]) {
      r = nextR;
      c = nextC;
    } else {
      dir = (dir + 1) % 4;
      r += dr[dir];
      c += dc[dir];
    }
  }

  return result;
}

// --- 2. Optimal Approach (Boundary Contraction: Top, Bottom, Left, Right) ---
// Time Complexity: O(m * n) - visits each cell exactly once
// Space Complexity: O(1) auxiliary space
export function spiralOrderOptimal(matrix: number[][]): number[] {
  const result: number[] = [];
  if (matrix.length === 0) return result;

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse from left to right across top row
    for (let c = left; c <= right; c++) {
      result.push(matrix[top][c]);
    }
    top++;

    // Traverse from top to bottom along right column
    for (let r = top; r <= bottom; r++) {
      result.push(matrix[r][right]);
    }
    right--;

    // Traverse from right to left along bottom row
    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        result.push(matrix[bottom][c]);
      }
      bottom--;
    }

    // Traverse from bottom to top along left column
    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        result.push(matrix[r][left]);
      }
      left++;
    }
  }

  return result;
}

// --- Test Verification ---
const mat = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.assert(JSON.stringify(spiralOrderOptimal(mat)) === JSON.stringify([1, 2, 3, 6, 9, 8, 7, 4, 5]), "Test failed");
