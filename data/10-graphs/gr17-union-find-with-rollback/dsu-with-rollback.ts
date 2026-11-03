/**
 * Problem: DSU with Rollback (Undo Operations)
 * Difficulty: Hard
 * Pattern: GR17 - Union-find with rollback
 *
 * Disjoint Set Union supporting union, find, checkpoint, and rollback.
 * Note: Path compression is NOT used (only union-by-rank) to enable O(1) undo.
 */

// --- Optimal Approach (Union by Rank + History Stack) ---
// Time Complexity: find: O(log n), union: O(log n), rollback: O(1)
// Space Complexity: O(n)
export class DSUWithRollback {
  private parent: number[];
  private rank: number[];
  private history: [u: number, prevParentU: number, v: number, prevRankV: number][] = [];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(1);
  }

  find(x: number): number {
    while (this.parent[x] !== x) {
      x = this.parent[x];
    }
    return x;
  }

  union(x: number, y: number): boolean {
    let rx = this.find(x);
    let ry = this.find(y);

    if (rx === ry) {
      this.history.push([-1, -1, -1, -1]); // no-op sentinel
      return false;
    }

    if (this.rank[rx] > this.rank[ry]) {
      [rx, ry] = [ry, rx];
    }

    // Save state before mutating
    this.history.push([rx, this.parent[rx], ry, this.rank[ry]]);
    this.parent[rx] = ry;
    if (this.rank[rx] === this.rank[ry]) {
      this.rank[ry]++;
    }

    return true;
  }

  checkpoint(): number {
    return this.history.length;
  }

  rollback(targetSize: number): void {
    while (this.history.length > targetSize) {
      const [u, prevParentU, v, prevRankV] = this.history.pop()!;
      if (u !== -1) {
        this.parent[u] = prevParentU;
        this.rank[v] = prevRankV;
      }
    }
  }
}

// --- Test Verification ---
const dsu = new DSUWithRollback(4);
const cp = dsu.checkpoint();
dsu.union(0, 1);
console.assert(dsu.find(0) === dsu.find(1), "Test 1 failed");
dsu.rollback(cp);
console.assert(dsu.find(0) !== dsu.find(1), "Test 2 failed (rollback worked)");
