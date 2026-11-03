/**
 * Pattern: Grid path exploration
 * Problem: Path with Maximum Gold (LeetCode 1219)
 *
 * In a gold mine grid of size m x n, each cell in this mine has an integer representing gold.
 * Find the maximum amount of gold you can collect starting from any cell containing gold.
 * You can't visit the same cell more than once in a path.
 */

// Brute Force: Run DFS from every gold cell with visited set
// Time: O(M * N * 4^(K)), Space: O(K) where K <= 25 is total gold cells
export function getMaximumGoldBrute(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  let maxGold = 0;

  function dfs(r: number, c: number, visited: Set<string>): number {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
    const key = `${r},${c}`;
    if (visited.has(key)) return 0;

    visited.add(key);
    let subMax = 0;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dr, dc] of dirs) {
      subMax = Math.max(subMax, dfs(r + dr, c + dc, visited));
    }
    visited.delete(key);

    return grid[r][c] + subMax;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] > 0) {
        maxGold = Math.max(maxGold, dfs(r, c, new Set<string>()));
      }
    }
  }
  return maxGold;
}

// Optimal: In-place grid cell zeroing + prune starts with 4 gold neighbors
// Time: O(M * N * 3^K), Space: O(K) stack
export function getMaximumGoldOptimal(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  let maxGold = 0;

  function dfs(r: number, c: number): number {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;

    const gold = grid[r][c];
    grid[r][c] = 0; // Mark visited

    const up = dfs(r - 1, c);
    const down = dfs(r + 1, c);
    const left = dfs(r, c - 1);
    const right = dfs(r, c + 1);

    grid[r][c] = gold; // Restore

    return gold + Math.max(up, down, left, right);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] > 0) {
        maxGold = Math.max(maxGold, dfs(r, c));
      }
    }
  }
  return maxGold;
}

// Test cases
const goldMine = [[0,6,0],[5,8,7],[0,9,0]];
const mg1 = getMaximumGoldBrute(goldMine);
const mg2 = getMaximumGoldOptimal(goldMine);
if (mg1 !== 24 || mg2 !== 24) throw new Error("Expected max gold 24");
console.log("Path with Maximum Gold passed!");
