/**
 * Pattern: Constraint-based search
 * Problem: N-Queens (LeetCode 51)
 *
 * Place n queens on an n x n chessboard such that no two queens attack each other.
 * Return all distinct solutions.
 */

// Brute Force: Board exploration checking isValid diagonally and column-wise
// Time: O(N! * N), Space: O(N^2)
export function solveNQueensBrute(n: number): string[][] {
  const board: string[][] = Array.from({ length: n }, () => new Array(n).fill("."));
  const result: string[][] = [];

  function isValid(row: number, col: number): boolean {
    // Check column
    for (let r = 0; r < row; r++) {
      if (board[r][col] === "Q") return false;
    }
    // Check top-left diagonal
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (board[r][c] === "Q") return false;
    }
    // Check top-right diagonal
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++) {
      if (board[r][c] === "Q") return false;
    }
    return true;
  }

  function backtrack(row: number): void {
    if (row === n) {
      result.push(board.map(r => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = ".";
      }
    }
  }

  backtrack(0);
  return result;
}

// Optimal: O(1) Constraint checking with bitmasks or boolean lookup arrays
// row + col identifies anti-diagonals, row - col + n identifies main diagonals
// Time: O(N!), Space: O(N)
export function solveNQueensOptimal(n: number): string[][] {
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // r - c
  const diag2 = new Set<number>(); // r + c
  const result: string[][] = [];
  const queenPositions: number[] = new Array(n).fill(-1);

  function backtrack(row: number): void {
    if (row === n) {
      const solution = queenPositions.map(c => ".".repeat(c) + "Q" + ".".repeat(n - c - 1));
      result.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;
      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      queenPositions[row] = col;

      backtrack(row + 1);

      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const nq1 = solveNQueensBrute(4);
const nq2 = solveNQueensOptimal(4);
if (nq1.length !== 2 || nq2.length !== 2) throw new Error("Expected 2 solutions for 4-Queens");
console.log("N-Queens passed!");
