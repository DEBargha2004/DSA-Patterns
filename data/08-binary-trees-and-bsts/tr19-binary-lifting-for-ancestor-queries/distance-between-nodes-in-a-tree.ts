/**
 * Problem: Distance Between Nodes in a Tree via LCA
 * Difficulty: Hard
 * Pattern: TR19 - Binary lifting for ancestor queries
 *
 * Find distance between any two nodes: dist(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)].
 */

// --- Optimal Approach (Binary Lifting for Distance) ---
// Time Complexity: O(log n) query
// Space Complexity: O(n log n)
export function getTreeDistance(n: number, adj: number[][], u: number, v: number): number {
  const maxPower = Math.floor(Math.log2(n)) + 1;
  const up: number[][] = Array.from({ length: n }, () => new Array(maxPower).fill(-1));
  const depth = new Array(n).fill(0);

  const dfs = (curr: number, parent: number, d: number) => {
    depth[curr] = d;
    up[curr][0] = parent;
    for (let j = 1; j < maxPower; j++) {
      if (up[curr][j - 1] !== -1) {
        up[curr][j] = up[up[curr][j - 1]][j - 1];
      }
    }
    for (const next of adj[curr]) {
      if (next !== parent) dfs(next, curr, d + 1);
    }
  };
  dfs(0, -1, 0);

  function getLCA(a: number, b: number): number {
    if (depth[a] < depth[b]) [a, b] = [b, a];
    const diff = depth[a] - depth[b];
    for (let j = 0; j < maxPower; j++) {
      if ((diff & (1 << j)) !== 0) a = up[a][j];
    }
    if (a === b) return a;
    for (let j = maxPower - 1; j >= 0; j--) {
      if (up[a][j] !== up[b][j]) {
        a = up[a][j];
        b = up[b][j];
      }
    }
    return up[a][0];
  }

  const lca = getLCA(u, v);
  return depth[u] + depth[v] - 2 * depth[lca];
}

// --- Test Verification ---
const adj = [[1, 2], [0, 3, 4], [0], [1], [1]];
console.assert(getTreeDistance(5, adj, 3, 4) === 2, "Test 1 failed");
console.assert(getTreeDistance(5, adj, 3, 2) === 3, "Test 2 failed");
