/**
 * Pattern: Grid path exploration
 * Problem: Unique Paths III (LeetCode 980)
 *
 * Return the number of 4-directional walks from the starting square to the ending square,
 * that walk over every non-obstacle square exactly once.
 */

// Brute Force: Standard DFS with a visited 2D boolean matrix
// Time: O(4^(M*N)), Space: O(M*N)
export function uniquePathsIIIBrute(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  let startR = 0, startC = 0;
  let emptyCount = 1; // Count starting cell

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        startR = r;
        startC = c;
      } else if (grid[r][c] === 0) {
        emptyCount++;
      }
    }
  }

  const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
  let paths = 0;

  function dfs(r: number, c: number, remaining: number): void {
    if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || grid[r][c] === -1) return;
    if (grid[r][c] === 2) {
      if (remaining === 0) paths++;
      return;
    }

    visited[r][c] = true;
    dfs(r + 1, c, remaining - 1);
    dfs(r - 1, c, remaining - 1);
    dfs(r, c + 1, remaining - 1);
    dfs(r, c - 1, remaining - 1);
    visited[r][c] = false;
  }

  dfs(startR, startC, emptyCount);
  return paths;
}

// Optimal: In-place grid marker modification avoiding allocation of visited matrix
// Time: O(3^(M*N)), Space: O(M*N) recursion stack
export function uniquePathsIIIOptimal(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  let startR = 0, startC = 0;
  let emptyCells = 1;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        startR = r;
        startC = c;
      } else if (grid[r][c] === 0) {
        emptyCells++;
      }
    }
  }

  let paths = 0;

  function backtrack(r: number, c: number, count: number): void {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === -1) return;
    if (grid[r][c] === 2) {
      if (count === emptyCells) paths++;
      return;
    }

    const temp = grid[r][c];
    grid[r][c] = -1; // Mark visited

    backtrack(r + 1, c, count + 1);
    backtrack(r - 1, c, count + 1);
    backtrack(r, c + 1, count + 1);
    backtrack(r, c - 1, count + 1);

    grid[r][c] = temp; // Unmark
  }

  backtrack(startR, startC, 0);
  return paths;
}

// Test cases
const grid1 = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]];
const up1 = uniquePathsIIIBrute(grid1);
const up2 = uniquePathsIIIOptimal(grid1);
if (up1 !== 2 || up2 !== 2) throw new Error("Expected 2 paths");
console.log("Unique Paths III passed!");
