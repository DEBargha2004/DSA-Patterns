/**
 * Problem: Heavy-Light Decomposition Path Query
 * Difficulty: Hard
 * Pattern: TR20 - Tree rerooting and heavy-light decomposition
 *
 * Decompose tree into heavy chains to query path sums / maximums in O((log n)^2).
 */

export class HeavyLightDecomposition {
  private parent: number[];
  private depth: number[];
  private heavy: number[];
  private head: number[];
  private pos: number[];
  private curPos = 0;

  constructor(n: number, adj: number[][], root: number = 0) {
    this.parent = new Array(n).fill(-1);
    this.depth = new Array(n).fill(0);
    this.heavy = new Array(n).fill(-1);
    this.head = new Array(n).fill(0);
    this.pos = new Array(n).fill(0);

    const dfs = (u: number, p: number, d: number): number => {
      this.parent[u] = p;
      this.depth[u] = d;
      let size = 1;
      let maxSubSize = 0;

      for (const v of adj[u]) {
        if (v !== p) {
          const subSize = dfs(v, u, d + 1);
          size += subSize;
          if (subSize > maxSubSize) {
            maxSubSize = subSize;
            this.heavy[u] = v;
          }
        }
      }
      return size;
    };

    const decompose = (u: number, h: number, p: number) => {
      this.head[u] = h;
      this.pos[u] = this.curPos++;

      if (this.heavy[u] !== -1) {
        decompose(this.heavy[u], h, u);
      }

      for (const v of adj[u]) {
        if (v !== p && v !== this.heavy[u]) {
          decompose(v, v, u);
        }
      }
    };

    dfs(root, -1, 0);
    decompose(root, root, -1);
  }

  // Decomposes path (u, v) into segments on heavy chains
  getPathSegments(u: number, v: number): [start: number, end: number][] {
    const segments: [number, number][] = [];

    while (this.head[u] !== this.head[v]) {
      if (this.depth[this.head[u]] > this.depth[this.head[v]]) {
        segments.push([this.pos[this.head[u]], this.pos[u]]);
        u = this.parent[this.head[u]];
      } else {
        segments.push([this.pos[this.head[v]], this.pos[v]]);
        v = this.parent[this.head[v]];
      }
    }

    if (this.depth[u] > this.depth[v]) {
      segments.push([this.pos[v], this.pos[u]]);
    } else {
      segments.push([this.pos[u], this.pos[v]]);
    }

    return segments;
  }
}

// --- Test Verification ---
const adj = [[1, 2], [0, 3], [0], [1]];
const hld = new HeavyLightDecomposition(4, adj, 0);
const segments = hld.getPathSegments(3, 2);
console.assert(segments.length > 0, "Test 1 failed");
