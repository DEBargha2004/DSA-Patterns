/**
 * Problem: Maximum Network Flow (Edmonds-Karp Algorithm)
 * Difficulty: Hard
 * Pattern: GR18 - Network flow and bipartite matching
 *
 * Compute maximum flow from source to sink in flow network using BFS augmenting paths.
 */

// --- Optimal Approach (Edmonds-Karp Algorithm) ---
// Time Complexity: O(V * E^2)
// Space Complexity: O(V^2)
export function maxFlow(n: number, capacity: number[][], src: number, sink: number): number {
  const cap = capacity.map((row) => [...row]);
  let totalFlow = 0;
  const parent = new Int32Array(n);

  function bfs(): boolean {
    parent.fill(-1);
    parent[src] = src;
    const queue: [u: number, flow: number][] = [[src, Infinity]];

    while (queue.length > 0) {
      const [u, curFlow] = queue.shift()!;

      for (let v = 0; v < n; v++) {
        if (parent[v] === -1 && cap[u][v] > 0) {
          parent[v] = u;
          const newFlow = Math.min(curFlow, cap[u][v]);
          if (v === sink) {
            totalFlow += newFlow;
            let curr = sink;
            while (curr !== src) {
              const p = parent[curr];
              cap[p][curr] -= newFlow;
              cap[curr][p] += newFlow;
              curr = p;
            }
            return true;
          }
          queue.push([v, newFlow]);
        }
      }
    }

    return false;
  }

  while (bfs()) {}

  return totalFlow;
}

// --- Test Verification ---
const cap = [
  [0, 10, 10, 0],
  [0, 0, 2, 8],
  [0, 0, 0, 9],
  [0, 0, 0, 0]
];
console.assert(maxFlow(4, cap, 0, 3) === 17, "Test 1 failed (max flow is 17)");
