/**
 * Pattern: Advanced graph algorithms
 * Problem: Strongly Connected Components (SCC) via Kosaraju's Algorithm
 */

// Brute Force: Check reachability between all pairs u -> v and v -> u via DFS
// Time: O(V^2 * (V + E)), Space: O(V)
export function sccBrute(n: number, edges: [number, number][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) adj[u].push(v);

  function canReach(start: number, target: number): boolean {
    const visited = new Set<number>();
    const stack = [start];
    visited.add(start);
    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (curr === target) return true;
      for (const next of adj[curr]) {
        if (!visited.has(next)) {
          visited.add(next);
          stack.push(next);
        }
      }
    }
    return false;
  }

  const inSameSCC: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j || (canReach(i, j) && canReach(j, i))) {
        inSameSCC[i][j] = true;
      }
    }
  }

  const visited = new Set<number>();
  const sccs: number[][] = [];
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      const comp: number[] = [];
      for (let j = 0; j < n; j++) {
        if (inSameSCC[i][j]) {
          comp.push(j);
          visited.add(j);
        }
      }
      sccs.push(comp);
    }
  }

  return sccs;
}

// Optimal: Kosaraju's Two-Pass Algorithm (Finish-time stack + Transpose graph DFS)
// Time: O(V + E), Space: O(V + E)
export function sccKosaraju(n: number, edges: [number, number][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  const revAdj: number[][] = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    adj[u].push(v);
    revAdj[v].push(u);
  }

  const visited = new Array(n).fill(false);
  const finishOrder: number[] = [];

  function dfs1(u: number): void {
    visited[u] = true;
    for (const v of adj[u]) {
      if (!visited[v]) dfs1(v);
    }
    finishOrder.push(u);
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs1(i);
  }

  visited.fill(false);
  const sccs: number[][] = [];

  function dfs2(u: number, currentSCC: number[]): void {
    visited[u] = true;
    currentSCC.push(u);
    for (const v of revAdj[u]) {
      if (!visited[v]) dfs2(v, currentSCC);
    }
  }

  while (finishOrder.length > 0) {
    const u = finishOrder.pop()!;
    if (!visited[u]) {
      const scc: number[] = [];
      dfs2(u, scc);
      sccs.push(scc);
    }
  }

  return sccs;
}

// Test cases
const edgesSCC: [number, number][] = [[1, 0], [0, 2], [2, 1], [0, 3], [3, 4]];
const scc1 = sccBrute(5, edgesSCC);
const scc2 = sccKosaraju(5, edgesSCC);
if (scc1.length !== 3 || scc2.length !== 3) throw new Error("Expected 3 SCCs");
console.log("Strongly Connected Components Kosaraju passed!");
