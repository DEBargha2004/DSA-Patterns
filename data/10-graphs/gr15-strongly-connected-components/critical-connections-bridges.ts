/**
 * Problem: Condensation Graph via SCC
 * Difficulty: Hard
 * Pattern: GR15 - Strongly connected components
 *
 * Build DAG by contracting each SCC into a single supernode.
 */

// --- Optimal Approach (SCC Condensation) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function buildCondensationGraph(n: number, adj: number[][]): { sccCount: number; sccAdj: Set<number>[] } {
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
  const sccId = new Int32Array(n);

  for (let i = 0; i < sccs.length; i++) {
    for (const node of sccs[i]) {
      sccId[node] = i;
    }
  }

  const sccAdj: Set<number>[] = Array.from({ length: sccs.length }, () => new Set());
  for (let u = 0; u < n; u++) {
    for (const v of adj[u]) {
      if (sccId[u] !== sccId[v]) {
        sccAdj[sccId[u]].add(sccId[v]);
      }
    }
  }

  return { sccCount: sccs.length, sccAdj };
}

// --- Test Verification ---
const g = [[1], [2], [0, 3], [4], []];
const condensed = buildCondensationGraph(5, g);
console.assert(condensed.sccCount === 3, "Test 1 failed");
