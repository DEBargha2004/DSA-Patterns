/**
 * Problem: Redundant Connection (LeetCode 684)
 * Difficulty: Medium
 * Pattern: GR6 - Cycle detection in undirected graphs
 *
 * Return an edge that can be removed so that resulting graph is a tree.
 */

// --- Optimal Approach (Disjoint Set Union with Path Compression) ---
// Time Complexity: O(n * alpha(n))
// Space Complexity: O(n)
export function findRedundantConnection(edges: number[][]): number[] {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);

    if (rootU === rootV) {
      return [u, v]; // edge forms cycle
    }

    parent[rootU] = rootV;
  }

  return [];
}

// --- Test Verification ---
console.assert(JSON.stringify(findRedundantConnection([[1, 2], [1, 3], [2, 3]])) === JSON.stringify([2, 3]), "Test 1 failed");
console.assert(JSON.stringify(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])) === JSON.stringify([1, 4]), "Test 2 failed");
