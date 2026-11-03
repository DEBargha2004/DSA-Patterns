/**
 * Problem: Number of Connected Components in an Undirected Graph (LeetCode 323 analog)
 * Difficulty: Medium
 * Pattern: GR3 - DFS and connected components
 *
 * Return number of connected components in undirected graph.
 */

// --- Optimal Approach (Adjacency List + DFS) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function countComponents(n: number, edges: number[][]): number {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Uint8Array(n);
  let components = 0;

  function dfs(u: number): void {
    visited[u] = 1;
    for (const v of adj[u]) {
      if (!visited[v]) dfs(v);
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      components++;
      dfs(i);
    }
  }

  return components;
}

// --- Test Verification ---
console.assert(countComponents(5, [[0, 1], [1, 2], [3, 4]]) === 2, "Test 1 failed");
console.assert(countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]) === 1, "Test 2 failed");
