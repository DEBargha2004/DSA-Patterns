/**
 * Problem: Shortest Bridge (LeetCode 934)
 * Difficulty: Medium
 * Pattern: GR9 - Multi-source BFS
 *
 * Return smallest number of 0s that must be flipped to connect two disconnected islands.
 */

// --- Optimal Approach (DFS to paint first island + Multi-source BFS to expand) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
export function shortestBridge(grid: number[][]): number {
  const n = grid.length;
  const queue: [r: number, c: number][] = [];
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // 1. Find and paint first island as 2 using DFS
  let found = false;
  function dfs(r: number, c: number): void {
    if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] !== 1) return;
    grid[r][c] = 2;
    queue.push([r, c]);
    for (const [dr, dc] of dirs) dfs(r + 1 * dr, c + 1 * dc);
  }

  for (let r = 0; r < n && !found; r++) {
    for (let c = 0; c < n && !found; c++) {
      if (grid[r][c] === 1) {
        dfs(r, c);
        found = true;
      }
    }
  }

  // 2. Multi-source BFS layer expansion
  let flips = 0;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
          if (grid[nr][nc] === 1) {
            return flips; // reached second island!
          }
          if (grid[nr][nc] === 0) {
            grid[nr][nc] = 2;
            queue.push([nr, nc]);
          }
        }
      }
    }
    flips++;
  }

  return flips;
}

// --- Test Verification ---
console.assert(shortestBridge([[0, 1], [1, 0]]) === 1, "Test 1 failed");
console.assert(shortestBridge([[0, 1, 0], [0, 0, 0], [0, 0, 1]]) === 2, "Test 2 failed");
