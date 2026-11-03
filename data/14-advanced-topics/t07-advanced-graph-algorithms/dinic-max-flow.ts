/**
 * Pattern: Advanced graph algorithms
 * Problem: Dinic's Algorithm for Maximum Network Flow
 */

interface FlowEdge {
  to: number;
  rev: number;
  capacity: number;
  flow: number;
}

// Optimal: Dinic's Algorithm with BFS Level Graph and DFS Blocking Flow
// Time: O(V^2 * E), Space: O(V + E)
export class DinicMaxFlow {
  private n: number;
  private adj: FlowEdge[][] = [];
  private level: number[] = [];
  private ptr: number[] = [];

  constructor(n: number) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => []);
  }

  addEdge(from: number, to: number, capacity: number): void {
    const forwardEdge: FlowEdge = { to, rev: this.adj[to].length, capacity, flow: 0 };
    const backwardEdge: FlowEdge = { to: from, rev: this.adj[from].length, capacity: 0, flow: 0 };
    this.adj[from].push(forwardEdge);
    this.adj[to].push(backwardEdge);
  }

  private bfs(s: number, t: number): boolean {
    this.level = new Array(this.n).fill(-1);
    this.level[s] = 0;
    const queue = [s];

    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const edge of this.adj[u]) {
        if (edge.capacity - edge.flow > 0 && this.level[edge.to] === -1) {
          this.level[edge.to] = this.level[u] + 1;
          queue.push(edge.to);
        }
      }
    }

    return this.level[t] !== -1;
  }

  private dfs(u: number, t: number, pushed: number): number {
    if (pushed === 0 || u === t) return pushed;

    for (let cid = this.ptr[u]; cid < this.adj[u].length; cid++) {
      this.ptr[u] = cid;
      const edge = this.adj[u][cid];
      const tr = edge.to;

      if (this.level[u] + 1 !== this.level[tr] || edge.capacity - edge.flow === 0) continue;

      const push = this.dfs(tr, t, Math.min(pushed, edge.capacity - edge.flow));
      if (push === 0) continue;

      edge.flow += push;
      this.adj[tr][edge.rev].flow -= push;
      return push;
    }

    return 0;
  }

  maxFlow(s: number, t: number): number {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.ptr = new Array(this.n).fill(0);
      while (true) {
        const pushed = this.dfs(s, t, Infinity);
        if (pushed === 0) break;
        flow += pushed;
      }
    }
    return flow;
  }
}

// Test cases
const dinic = new DinicMaxFlow(6);
dinic.addEdge(0, 1, 10);
dinic.addEdge(0, 2, 10);
dinic.addEdge(1, 2, 2);
dinic.addEdge(1, 3, 4);
dinic.addEdge(1, 4, 8);
dinic.addEdge(2, 4, 9);
dinic.addEdge(3, 5, 10);
dinic.addEdge(4, 5, 10);

const flow = dinic.maxFlow(0, 5);
if (flow !== 14) throw new Error(`Expected max flow 14, got ${flow}`);
console.log("Dinic Max Flow passed!");
