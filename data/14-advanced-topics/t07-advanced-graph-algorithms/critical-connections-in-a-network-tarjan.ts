/**
 * Pattern: Advanced graph algorithms
 * Problem: Critical Connections in a Network (LeetCode 1192) - Tarjan's Bridge-Finding Algorithm
 */

// Brute Force: Remove each edge one by one and run BFS/DFS to check connectivity
// Time: O(E * (V + E)), Space: O(V + E)
export function criticalConnectionsBrute(n: number, connections: number[][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const bridges: number[][] = [];

  function isConnectedWithoutEdge(skipU: number, skipV: number): boolean {
    const visited = new Set<number>();
    const queue = [0];
    visited.add(0);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const next of adj[curr]) {
        if ((curr === skipU && next === skipV) || (curr === skipV && next === skipU)) continue;
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }

    return visited.size === n;
  }

  for (const [u, v] of connections) {
    if (!isConnectedWithoutEdge(u, v)) {
      bridges.push([u, v]);
    }
  }

  return bridges;
}

// Optimal: Tarjan's Bridge-Finding Algorithm (Discovery time & Lowest reach time)
// Edge (u, v) is a bridge if and only if low[v] > disc[u]
// Time: O(V + E), Space: O(V + E)
export function criticalConnectionsOptimal(n: number, connections: number[][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const bridges: number[][] = [];
  let time = 0;

  function dfs(u: number, parent: number): void {
    disc[u] = low[u] = time++;

    for (const v of adj[u]) {
      if (v === parent) continue;

      if (disc[v] !== -1) {
        // Back edge
        low[u] = Math.min(low[u], disc[v]);
      } else {
        // Tree edge
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);

        if (low[v] > disc[u]) {
          bridges.push([u, v]);
        }
      }
    }
  }

  dfs(0, -1);
  return bridges;
}

// Test cases
const conns = [[0,1],[1,2],[2,0],[1,3]];
const b1 = criticalConnectionsBrute(4, conns);
const b2 = criticalConnectionsOptimal(4, conns);
if (b1.length !== 1 || b2.length !== 1 || (b2[0][0] !== 1 && b2[0][1] !== 1)) {
  throw new Error("Expected bridge [1, 3]");
}
console.log("Critical Connections Tarjan passed!");
