/**
 * Problem: Graph Valid Tree (LeetCode 261 analog)
 * Difficulty: Medium
 * Pattern: GR6 - Cycle detection in undirected graphs
 *
 * Determine if undirected graph with n nodes and edges forms a valid tree (connected & acyclic).
 */

// --- Optimal Approach (Edge Count Check + DSU Cycle Detection) ---
// A valid tree with n nodes MUST have exactly n - 1 edges and no cycles.
// Time Complexity: O(n * alpha(n))
// Space Complexity: O(n)
export function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;

  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU === rootV) return false; // cycle!
    parent[rootU] = rootV;
  }

  return true;
}

// --- Test Verification ---
console.assert(validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]) === true, "Test 1 failed");
console.assert(validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]) === false, "Test 2 failed (cycle)");
