/**
 * Problem: Articulation Points (Cut Vertices) in Undirected Graph
 * Difficulty: Hard
 * Pattern: GR16 - Bridges and articulation points
 *
 * Find all vertices whose removal increases the number of connected components.
 */

// --- Optimal Approach (Tarjan's Cut Vertex Algorithm) ---
// A non-root vertex u is an articulation point if it has child v with low[v] >= disc[u].
// Root is an articulation point if it has >= 2 children in DFS tree.
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function findArticulationPoints(n: number, edges: number[][]): number[] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const disc = new Int32Array(n).fill(-1);
  const low = new Int32Array(n).fill(-1);
  const isAP = new Uint8Array(n);
  let time = 0;

  function dfs(u: number, parent: number): void {
    disc[u] = low[u] = time++;
    let children = 0;

    for (const v of adj[u]) {
      if (v === parent) continue;

      if (disc[v] !== -1) {
        low[u] = Math.min(low[u], disc[v]);
      } else {
        children++;
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);

        if (parent !== -1 && low[v] >= disc[u]) {
          isAP[u] = 1;
        }
      }
    }

    if (parent === -1 && children > 1) {
      isAP[u] = 1;
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i, -1);
  }

  const points: number[] = [];
  for (let i = 0; i < n; i++) {
    if (isAP[i]) points.push(i);
  }

  return points;
}

// --- Test Verification ---
const pts = findArticulationPoints(5, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]]);
console.assert(JSON.stringify(pts) === JSON.stringify([1, 3]), "Test 1 failed (nodes 1 and 3 are articulation points)");
