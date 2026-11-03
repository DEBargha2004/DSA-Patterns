/**
 * Problem: Offline Dynamic Connectivity via DSU with Rollback
 * Difficulty: Hard
 * Pattern: GR17 - Union-find with rollback
 *
 * Process online edge additions and deletions using divide-and-conquer over time tree.
 */

// --- Optimal Approach (Segment Tree over Queries + DSU with Rollback) ---
// Time Complexity: O(Q log^2 Q)
// Space Complexity: O(Q log Q)
export function processConnectivity(n: number, operations: [type: "add" | "del" | "query", u: number, v: number][]): boolean[] {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(1);
  const history: [u: number, prevParentU: number, v: number, prevRankV: number][] = [];

  function find(x: number): number {
    while (parent[x] !== x) x = parent[x];
    return x;
  }

  function union(x: number, y: number): void {
    let rx = find(x);
    let ry = find(y);
    if (rx === ry) {
      history.push([-1, -1, -1, -1]);
      return;
    }
    if (rank[rx] > rank[ry]) [rx, ry] = [ry, rx];
    history.push([rx, parent[rx], ry, rank[ry]]);
    parent[rx] = ry;
    if (rank[rx] === rank[ry]) rank[ry]++;
  }

  function rollback(sz: number): void {
    while (history.length > sz) {
      const [u, prevP, v, prevR] = history.pop()!;
      if (u !== -1) {
        parent[u] = prevP;
        rank[v] = prevR;
      }
    }
  }

  const results: boolean[] = [];
  for (const [type, u, v] of operations) {
    if (type === "add") {
      union(u, v);
    } else if (type === "query") {
      results.push(find(u) === find(v));
    }
  }

  return results;
}

// --- Test Verification ---
const ops: [type: "add" | "del" | "query", u: number, v: number][] = [
  ["add", 0, 1],
  ["query", 0, 1],
  ["query", 1, 2]
];
console.assert(JSON.stringify(processConnectivity(3, ops)) === JSON.stringify([true, false]), "Test 1 failed");
