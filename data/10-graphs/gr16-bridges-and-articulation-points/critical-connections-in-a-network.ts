/**
 * Problem: Critical Connections in a Network (LeetCode 1192)
 * Difficulty: Hard
 * Pattern: GR16 - Bridges and articulation points
 *
 * Find all bridges (critical connections whose removal disconnects the graph).
 */

// --- Optimal Approach (Tarjan's Bridge Algorithm) ---
// An edge (u, v) is a bridge if low[v] > disc[u].
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function criticalConnections(n: number, connections: number[][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const disc = new Int32Array(n).fill(-1);
  const low = new Int32Array(n).fill(-1);
  const bridges: number[][] = [];
  let time = 0;

  function dfs(u: number, parent: number): void {
    disc[u] = low[u] = time++;

    for (const v of adj[u]) {
      if (v === parent) continue;

      if (disc[v] !== -1) {
        low[u] = Math.min(low[u], disc[v]);
      } else {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);

        if (low[v] > disc[u]) {
          bridges.push([u, v]);
        }
      }
    }
  }

  dfs(0, -1);
  return bridges;
}

// --- Test Verification ---
const b1 = criticalConnections(4, [[0, 1], [1, 2], [2, 0], [1, 3]]);
console.assert(JSON.stringify(b1) === JSON.stringify([[1, 3]]), "Test 1 failed");
const b2 = criticalConnections(2, [[0, 1]]);
console.assert(JSON.stringify(b2) === JSON.stringify([[0, 1]]), "Test 2 failed");
