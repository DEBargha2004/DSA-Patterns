/**
 * Problem: Lowest Common Ancestor using Binary Lifting
 * Difficulty: Hard
 * Pattern: TR19 - Binary lifting for ancestor queries
 *
 * Find LCA of two nodes in an n-ary tree in O(log n) per query.
 */

export class BinaryLiftingLCA {
  private up: number[][];
  private depth: number[];
  private maxPower: number;

  constructor(n: number, adj: number[][], root: number = 0) {
    this.maxPower = Math.floor(Math.log2(n)) + 1;
    this.up = Array.from({ length: n }, () => new Array(this.maxPower).fill(-1));
    this.depth = new Array(n).fill(0);

    const dfs = (u: number, p: number, d: number) => {
      this.depth[u] = d;
      this.up[u][0] = p;

      for (let j = 1; j < this.maxPower; j++) {
        if (this.up[u][j - 1] !== -1) {
          this.up[u][j] = this.up[this.up[u][j - 1]][j - 1];
        }
      }

      for (const v of adj[u]) {
        if (v !== p) {
          dfs(v, u, d + 1);
        }
      }
    };

    dfs(root, -1, 0);
  }

  getLCA(u: number, v: number): number {
    if (this.depth[u] < this.depth[v]) {
      [u, v] = [v, u];
    }

    // Bring u to same depth as v
    const diff = this.depth[u] - this.depth[v];
    for (let j = 0; j < this.maxPower; j++) {
      if ((diff & (1 << j)) !== 0) {
        u = this.up[u][j];
      }
    }

    if (u === v) return u;

    // Lift both until their parent is the LCA
    for (let j = this.maxPower - 1; j >= 0; j--) {
      if (this.up[u][j] !== this.up[v][j]) {
        u = this.up[u][j];
        v = this.up[v][j];
      }
    }

    return this.up[u][0];
  }
}

// --- Test Verification ---
const adj = [[1, 2], [0, 3, 4], [0], [1], [1]];
const lcaFinder = new BinaryLiftingLCA(5, adj, 0);
console.assert(lcaFinder.getLCA(3, 4) === 1, "Test 1 failed");
console.assert(lcaFinder.getLCA(3, 2) === 0, "Test 2 failed");
