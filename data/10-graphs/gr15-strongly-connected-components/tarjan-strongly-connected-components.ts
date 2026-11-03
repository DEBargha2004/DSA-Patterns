/**
 * Problem: Strongly Connected Components (Tarjan's Algorithm)
 * Difficulty: Hard
 * Pattern: GR15 - Strongly connected components
 *
 * Find SCCs in single DFS pass using discovery and low link values.
 */

// --- Optimal Approach (Tarjan's Single-Pass SCC) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V)
export function tarjanSCC(n: number, adj: number[][]): number[][] {
  const disc = new Int32Array(n).fill(-1);
  const low = new Int32Array(n).fill(-1);
  const onStack = new Uint8Array(n);
  const stack: number[] = [];
  const sccs: number[][] = [];
  let time = 0;

  function dfs(u: number): void {
    disc[u] = low[u] = time++;
    stack.push(u);
    onStack[u] = 1;

    for (const v of adj[u]) {
      if (disc[v] === -1) {
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (onStack[v]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }

    // Root of SCC
    if (low[u] === disc[u]) {
      const comp: number[] = [];
      while (true) {
        const node = stack.pop()!;
        onStack[node] = 0;
        comp.push(node);
        if (node === u) break;
      }
      sccs.push(comp);
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i);
  }

  return sccs;
}

// --- Test Verification ---
const g = [[1], [2], [0, 3], [4], []];
const res = tarjanSCC(5, g);
console.assert(res.length === 3, "Test 1 failed");
