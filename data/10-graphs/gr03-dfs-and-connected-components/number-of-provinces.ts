/**
 * Problem: Number of Provinces (LeetCode 547)
 * Difficulty: Medium
 * Pattern: GR3 - DFS and connected components
 *
 * Find total number of connected components in adjacency matrix.
 */

// --- Optimal Approach (DFS Connected Component Counting) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited = new Uint8Array(n);
  let provinces = 0;

  function dfs(u: number): void {
    visited[u] = 1;
    for (let v = 0; v < n; v++) {
      if (isConnected[u][v] === 1 && !visited[v]) {
        dfs(v);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      provinces++;
      dfs(i);
    }
  }

  return provinces;
}

// --- Test Verification ---
console.assert(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]) === 2, "Test 1 failed");
console.assert(findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) === 3, "Test 2 failed");
