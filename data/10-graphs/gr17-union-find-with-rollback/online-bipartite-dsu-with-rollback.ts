/**
 * Problem: Online Bipartite Check using DSU with Rollback
 * Difficulty: Hard
 * Pattern: GR17 - Union-find with rollback
 *
 * Check bipartiteness dynamically with checkpoint and rollback support.
 */

// --- Optimal Approach (2*N Node Representation) ---
// Represent node x with colors x and x + n.
export class BipartiteDSUWithRollback {
  private parent: number[];
  private rank: number[];
  private history: [u: number, prevParentU: number, v: number, prevRankV: number][] = [];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.parent = Array.from({ length: 2 * n }, (_, i) => i);
    this.rank = new Array(2 * n).fill(1);
  }

  find(x: number): number {
    while (this.parent[x] !== x) x = this.parent[x];
    return x;
  }

  union(x: number, y: number): boolean {
    let rx = this.find(x);
    let ry = this.find(y);
    if (rx === ry) {
      this.history.push([-1, -1, -1, -1]);
      return false;
    }
    if (this.rank[rx] > this.rank[ry]) [rx, ry] = [ry, rx];
    this.history.push([rx, this.parent[rx], ry, this.rank[ry]]);
    this.parent[rx] = ry;
    if (this.rank[rx] === this.rank[ry]) this.rank[ry]++;
    return true;
  }

  addEdge(u: number, v: number): boolean {
    this.union(u, v + this.n);
    this.union(u + this.n, v);
    return this.find(u) !== this.find(u + this.n);
  }

  checkpoint(): number {
    return this.history.length;
  }

  rollback(cp: number): void {
    while (this.history.length > cp) {
      const [u, prevP, v, prevR] = this.history.pop()!;
      if (u !== -1) {
        this.parent[u] = prevP;
        this.rank[v] = prevR;
      }
    }
  }
}

// --- Test Verification ---
const bdsu = new BipartiteDSUWithRollback(3);
const cp = bdsu.checkpoint();
console.assert(bdsu.addEdge(0, 1) === true, "Test 1 failed");
console.assert(bdsu.addEdge(1, 2) === true, "Test 2 failed");
console.assert(bdsu.addEdge(0, 2) === false, "Test 3 failed (odd cycle 0-1-2)");
bdsu.rollback(cp);
console.assert(bdsu.addEdge(0, 2) === true, "Test 4 failed (restored)");
