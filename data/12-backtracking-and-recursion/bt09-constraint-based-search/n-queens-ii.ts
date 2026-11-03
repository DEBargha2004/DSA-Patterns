/**
 * Pattern: Constraint-based search
 * Problem: N-Queens II (LeetCode 52)
 *
 * Return the number of distinct solutions to the n-queens puzzle.
 */

// Brute Force: Array lookup for columns and diagonals
// Time: O(N!), Space: O(N)
export function totalNQueensArray(n: number): number {
  const cols = new Array(n).fill(false);
  const diag1 = new Array(2 * n).fill(false);
  const diag2 = new Array(2 * n).fill(false);
  let count = 0;

  function backtrack(row: number): void {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col + n;
      const d2 = row + col;
      if (cols[col] || diag1[d1] || diag2[d2]) continue;

      cols[col] = diag1[d1] = diag2[d2] = true;
      backtrack(row + 1);
      cols[col] = diag1[d1] = diag2[d2] = false;
    }
  }

  backtrack(0);
  return count;
}

// Optimal: Bitwise Operations (Extreme speed using bit manipulation)
// cols, diag1, diag2 represented as integers
// Time: O(N!), Space: O(N) stack
export function totalNQueensBitwise(n: number): number {
  let count = 0;
  const fullMask = (1 << n) - 1;

  function backtrack(row: number, cols: number, diag1: number, diag2: number): void {
    if (row === n) {
      count++;
      return;
    }

    // available positions are where cols, diag1, diag2 are 0
    let available = fullMask & ~(cols | diag1 | diag2);

    while (available > 0) {
      // Pick lowest set bit
      const p = available & -available;
      available -= p;
      backtrack(row + 1, cols | p, (diag1 | p) << 1, (diag2 | p) >> 1);
    }
  }

  backtrack(0, 0, 0, 0);
  return count;
}

// Test cases
if (totalNQueensArray(4) !== 2 || totalNQueensBitwise(4) !== 2) throw new Error("Expected 2 for n=4");
if (totalNQueensBitwise(8) !== 92) throw new Error("Expected 92 for n=8");
console.log("N-Queens II passed!");
