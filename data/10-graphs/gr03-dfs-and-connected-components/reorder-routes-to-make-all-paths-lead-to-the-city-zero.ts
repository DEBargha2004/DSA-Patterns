/**
 * Problem: Reorder Routes to Make All Paths Lead to the City Zero (LeetCode 1466)
 * Difficulty: Medium
 * Pattern: GR3 - DFS and connected components
 *
 * Count minimum edges to reverse so every node can reach node 0.
 */

// --- Optimal Approach (Bi-directional Graph DFS tracking original directions) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function minReorder(n: number, connections: number[][]): number {
  // adj[u] stores: [v, isOriginalDirection]
  const adj: [neighbor: number, isOriginal: boolean][][] = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    adj[u].push([v, true]);
    adj[v].push([u, false]);
  }

  let reversals = 0;
  const visited = new Uint8Array(n);

  function dfs(u: number): void {
    visited[u] = 1;
    for (const [v, isOriginal] of adj[u]) {
      if (!visited[v]) {
        if (isOriginal) {
          reversals++; // edge points away from 0, must reverse
        }
        dfs(v);
      }
    }
  }

  dfs(0);
  return reversals;
}

// --- Test Verification ---
console.assert(minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]) === 3, "Test 1 failed");
console.assert(minReorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]) === 2, "Test 2 failed");
