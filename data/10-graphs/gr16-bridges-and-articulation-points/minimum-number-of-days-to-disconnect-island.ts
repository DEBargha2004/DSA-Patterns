/**
 * Problem: Minimum Number of Days to Disconnect Island (LeetCode 1568)
 * Difficulty: Hard
 * Pattern: GR16 - Bridges and articulation points
 *
 * Find min days to disconnect grid (answer is always 0, 1, or 2).
 */

// --- Optimal Approach (Island Count + Articulation Point Test) ---
// Time Complexity: O((m * n)^2)
// Space Complexity: O(m * n)
export function minDays(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  function countIslands(): number {
    const visited = Array.from({ length: m }, () => new Uint8Array(n));
    let count = 0;

    function dfs(r: number, c: number): void {
      if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== 1 || visited[r][c]) return;
      visited[r][c] = 1;
      dfs(r + 1, c);
      dfs(r - 1, c);
      dfs(r, c + 1);
      dfs(r, c - 1);
    }

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] === 1 && !visited[r][c]) {
          count++;
          dfs(r, c);
        }
      }
    }

    return count;
  }

  // If already disconnected
  if (countIslands() !== 1) return 0;

  // Try removing 1 cell
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        grid[r][c] = 0;
        if (countIslands() !== 1) return 1;
        grid[r][c] = 1;
      }
    }
  }

  return 2;
}

// --- Test Verification ---
console.assert(minDays([[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]) === 2, "Test 1 failed");
console.assert(minDays([[1, 1]]) === 2, "Test 2 failed");
console.assert(minDays([[1, 0], [0, 1]]) === 0, "Test 3 failed");
