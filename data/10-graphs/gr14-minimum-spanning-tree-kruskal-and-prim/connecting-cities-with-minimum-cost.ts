/**
 * Problem: Connecting Cities With Minimum Cost (LeetCode 1135 analog)
 * Difficulty: Medium
 * Pattern: GR14 - Minimum spanning tree: Kruskal and Prim
 *
 * Find min cost to connect all n cities using Kruskal's algorithm.
 */

// --- Optimal Approach (Kruskal's Algorithm with DSU) ---
// Time Complexity: O(E log E)
// Space Complexity: O(V)
export function minimumCost(n: number, connections: number[][]): number {
  connections.sort((a, b) => a[2] - b[2]); // sort by edge weight
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  let edgesCount = 0;
  let totalCost = 0;

  for (const [u, v, cost] of connections) {
    const rootU = find(u);
    const rootV = find(v);

    if (rootU !== rootV) {
      parent[rootU] = rootV;
      totalCost += cost;
      edgesCount++;
      if (edgesCount === n - 1) return totalCost;
    }
  }

  return edgesCount === n - 1 ? totalCost : -1;
}

// --- Test Verification ---
console.assert(minimumCost(3, [[1, 2, 5], [1, 3, 6], [2, 3, 1]]) === 6, "Test 1 failed");
console.assert(minimumCost(4, [[1, 2, 3], [3, 4, 4]]) === -1, "Test 2 failed");
