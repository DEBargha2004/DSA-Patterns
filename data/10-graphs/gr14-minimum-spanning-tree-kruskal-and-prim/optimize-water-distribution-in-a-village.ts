/**
 * Problem: Optimize Water Distribution in a Village (LeetCode 1168 analog)
 * Difficulty: Hard
 * Pattern: GR14 - Minimum spanning tree: Kruskal and Prim
 *
 * Connect all houses to water either by building well or laying pipes.
 * Add virtual node 0 connected to each house with cost equal to well cost.
 */

// --- Optimal Approach (Virtual Node + Kruskal's MST) ---
// Time Complexity: O((V + E) log(V + E))
// Space Complexity: O(V + E)
export function minCostToSupplyWater(n: number, wells: number[], pipes: number[][]): number {
  const allEdges: [u: number, v: number, cost: number][] = [];

  // Add virtual node 0 edges
  for (let i = 0; i < n; i++) {
    allEdges.push([0, i + 1, wells[i]]);
  }

  // Add existing pipe edges
  for (const [u, v, cost] of pipes) {
    allEdges.push([u, v, cost]);
  }

  allEdges.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  let totalCost = 0;
  let edgesCount = 0;

  for (const [u, v, cost] of allEdges) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU !== rootV) {
      parent[rootU] = rootV;
      totalCost += cost;
      edgesCount++;
      if (edgesCount === n) break;
    }
  }

  return totalCost;
}

// --- Test Verification ---
const cost = minCostToSupplyWater(3, [1, 2, 2], [[1, 2, 1], [2, 3, 1]]);
console.assert(cost === 3, "Test 1 failed (1 well at house 1 + 2 pipes = 3)");
