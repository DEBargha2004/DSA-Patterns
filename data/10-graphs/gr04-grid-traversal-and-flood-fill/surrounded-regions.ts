/**
 * Problem: Surrounded Regions (LeetCode 130)
 * Difficulty: Medium
 * Pattern: GR4 - Grid traversal and flood fill
 *
 * Capture all regions surrounded by 'X' by converting 'O's into 'X's.
 */

// --- Optimal Approach (Boundary Flood Fill) ---
// Flood fill from boundary 'O's to mark connected cells safe.
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
export function solve(board: string[][]): void {
  const m = board.length;
  if (m === 0) return;
  const n = board[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== "O") return;
    board[r][c] = "E"; // Escaped / boundary safe

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // 1. Traverse boundaries
  for (let r = 0; r < m; r++) {
    if (board[r][0] === "O") dfs(r, 0);
    if (board[r][n - 1] === "O") dfs(r, n - 1);
  }
  for (let c = 0; c < n; c++) {
    if (board[0][c] === "O") dfs(0, c);
    if (board[m - 1][c] === "O") dfs(m - 1, c);
  }

  // 2. Flip surrounded 'O' -> 'X', and safe 'E' -> 'O'
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "O") {
        board[r][c] = "X";
      } else if (board[r][c] === "E") {
        board[r][c] = "O";
      }
    }
  }
}

// --- Test Verification ---
const board = [
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"]
];
solve(board);
console.assert(board[1][1] === "X" && board[1][2] === "X", "Test 1 failed");
console.assert(board[3][1] === "O", "Test 2 failed (boundary connected)");
