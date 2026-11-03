/**
 * Problem: Swim in Rising Water (LeetCode 778)
 * Difficulty: Hard
 * Pattern: BS12 - Binary search on reachability predicate
 *
 * Return least time until you can reach bottom right square [n-1, n-1] from [0, 0].
 */

// --- Optimal Approach (Binary Search over Elevation [0, n^2 - 1] + BFS/DFS) ---
// Time Complexity: O(n^2 log n)
// Space Complexity: O(n^2)
export function swimInWater(grid: number[][]): number {
  const n = grid.length;
  let left = Math.max(grid[0][0], grid[n - 1][n - 1]);
  let right = n * n - 1;
  let ans = right;

  function canReach(maxT: number): boolean {
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));
    const queue: [number, number][] = [[0, 0]];
    visited[0][0] = true;

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      if (r === n - 1 && c === n - 1) return true;

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= maxT) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    return false;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canReach(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(swimInWater([[0, 2], [1, 3]]) === 3, "Test 1 failed");
