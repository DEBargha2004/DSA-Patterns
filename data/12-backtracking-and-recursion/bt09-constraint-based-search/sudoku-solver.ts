/**
 * Pattern: Constraint-based search
 * Problem: Sudoku Solver (LeetCode 37)
 *
 * Write a program to solve a Sudoku puzzle by filling empty cells ('.').
 */

// Brute Force: Scan board each step to find valid number by checking row, col, box
// Time: O(9^(empty cells)), Space: O(1)
export function solveSudokuBrute(board: string[][]): void {
  function isValid(r: number, c: number, ch: string): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch) return false;
      if (board[i][c] === ch) return false;
      const boxR = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const boxC = 3 * Math.floor(c / 3) + (i % 3);
      if (board[boxR][boxC] === ch) return false;
    }
    return true;
  }

  function solve(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          for (let d = 1; d <= 9; d++) {
            const ch = d.toString();
            if (isValid(r, c, ch)) {
              board[r][c] = ch;
              if (solve()) return true;
              board[r][c] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
}

// Optimal: Bitmask State Tracking for Rows, Columns, and 3x3 Boxes
// Time: O(9^(empty cells)), Space: O(1)
export function solveSudokuOptimal(board: string[][]): void {
  const rowMask = new Array(9).fill(0);
  const colMask = new Array(9).fill(0);
  const boxMask = new Array(9).fill(0);
  const emptyCells: [number, number][] = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== '.') {
        const val = parseInt(board[r][c], 10);
        const bit = 1 << val;
        const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        rowMask[r] |= bit;
        colMask[c] |= bit;
        boxMask[box] |= bit;
      } else {
        emptyCells.push([r, c]);
      }
    }
  }

  function backtrack(idx: number): boolean {
    if (idx === emptyCells.length) return true;
    const [r, c] = emptyCells[idx];
    const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

    for (let num = 1; num <= 9; num++) {
      const bit = 1 << num;
      if ((rowMask[r] & bit) === 0 && (colMask[c] & bit) === 0 && (boxMask[box] & bit) === 0) {
        board[r][c] = num.toString();
        rowMask[r] |= bit;
        colMask[c] |= bit;
        boxMask[box] |= bit;

        if (backtrack(idx + 1)) return true;

        // Undo
        board[r][c] = '.';
        rowMask[r] &= ~bit;
        colMask[c] &= ~bit;
        boxMask[box] &= ~bit;
      }
    }
    return false;
  }

  backtrack(0);
}

// Test cases
const boardTest = [
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
solveSudokuOptimal(boardTest);
if (boardTest[0][2] !== "4" || boardTest[8][8] !== "9") throw new Error("Sudoku solved incorrectly");
console.log("Sudoku Solver passed!");
