/**
 * Problem: Valid Sudoku (LeetCode 36)
 * Difficulty: Medium
 * Pattern: A2 - Hash map/set lookup
 *
 * Determine if a 9 x 9 Sudoku board is valid. Only filled cells must be validated.
 */

// --- 1. Brute Force Approach (Separate nested checks for row, col, and 3x3 box) ---
// Time Complexity: O(81) = O(1)
// Space Complexity: O(81) = O(1)
export function isValidSudokuBruteForce(board: string[][]): boolean {
  // Check rows
  for (let r = 0; r < 9; r++) {
    const seen = new Set<string>();
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val !== '.') {
        if (seen.has(val)) return false;
        seen.add(val);
      }
    }
  }
  // Check columns
  for (let c = 0; c < 9; c++) {
    const seen = new Set<string>();
    for (let r = 0; r < 9; r++) {
      const val = board[r][c];
      if (val !== '.') {
        if (seen.has(val)) return false;
        seen.add(val);
      }
    }
  }
  // Check 3x3 sub-boxes
  for (let boxR = 0; boxR < 3; boxR++) {
    for (let boxC = 0; boxC < 3; boxC++) {
      const seen = new Set<string>();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const val = board[boxR * 3 + r][boxC * 3 + c];
          if (val !== '.') {
            if (seen.has(val)) return false;
            seen.add(val);
          }
        }
      }
    }
  }
  return true;
}

// --- 2. Optimal Approach (Single-Pass Hash Set / Bitmask Encoding) ---
// Time Complexity: O(1) (fixed 9x9 board)
// Space Complexity: O(1)
export function isValidSudokuOptimal(board: string[][]): boolean {
  const seen = new Set<string>();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val !== '.') {
        const rowKey = `r${r}-${val}`;
        const colKey = `c${c}-${val}`;
        const boxKey = `b${Math.floor(r / 3)}-${Math.floor(c / 3)}-${val}`;

        if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
          return false;
        }

        seen.add(rowKey);
        seen.add(colKey);
        seen.add(boxKey);
      }
    }
  }

  return true;
}

// --- Test Verification ---
const board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
console.assert(isValidSudokuOptimal(board) === true, "Valid Sudoku test failed");
