/**
 * Problem: Strongly Connected Components (Kosaraju's Algorithm)
 * Difficulty: Hard
 * Pattern: GR15 - Strongly connected components
 *
 * Decompose directed graph into strongly connected components in O(V + E).
 */

// --- Optimal Approach (Kosaraju's 2-Pass Algorithm) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function kosarajuSCC(n: number, adj: number[][]): number[][] {
  const visited = new Uint8Array(n);
  const finishOrder: number[] = [];

  // Pass 1: DFS on original graph to record finish times
  function dfs1(u: number): void {
    visited[u] = 1;
    for (const v of adj[u]) {
      if (!visited[v]) dfs1(v);
    }
    finishOrder.push(u);
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs1(i);
  }

  // Reverse graph
  const revAdj: number[][] = Array.from({ length: n }, () => []);
  for (let u = 0; u < n; u++) {
    for (const v of adj[u]) {
      revAdj[v].push(u);
    }
  }

  // Pass 2: DFS on reversed graph in decreasing finish time order
  visited.fill(0);
  const sccList: number[][] = [];

  function dfs2(u: number, comp: number[]): void {
    visited[u] = 1;
    comp.push(u);
    for (const v of revAdj[u]) {
      if (!visited[v]) dfs2(v, comp);
    }
  }

  while (finishOrder.length > 0) {
    const u = finishOrder.pop()!;
    if (!visited[u]) {
      const comp: number[] = [];
      dfs2(u, comp);
      sccList.push(comp);
    }
  }

  return sccList;
}

// --- Test Verification ---
const graph = [[1], [2], [0, 3], [4], []];
const sccs = kosarajuSCC(5, graph);
console.assert(sccs.length === 3, "Test 1 failed (3 components: {0,1,2}, {3}, {4})");
