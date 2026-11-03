/**
 * Problem: Bellman-Ford Single Source Shortest Path with Negative Cycle Detection
 * Difficulty: Medium
 * Pattern: GR11 - Bellman–Ford
 *
 * Compute shortest paths from source and detect negative cycles.
 */

export interface Edge {
  u: number;
  v: number;
  w: number;
}

// --- Optimal Approach (Bellman-Ford Algorithm) ---
// Time Complexity: O(V * E)
// Space Complexity: O(V)
export function bellmanFord(n: number, edges: Edge[], src: number): { dist: number[]; hasNegCycle: boolean } {
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  // Relax all edges V - 1 times
  for (let i = 1; i <= n - 1; i++) {
    for (const { u, v, w } of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Check for negative weight cycles
  let hasNegCycle = false;
  for (const { u, v, w } of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegCycle = true;
      break;
    }
  }

  return { dist, hasNegCycle };
}

// --- Test Verification ---
const edges1: Edge[] = [
  { u: 0, v: 1, w: 4 },
  { u: 0, v: 2, w: 5 },
  { u: 1, v: 2, w: -2 },
  { u: 2, v: 3, w: 3 }
];
const res1 = bellmanFord(4, edges1, 0);
console.assert(res1.hasNegCycle === false && res1.dist[3] === 5, "Test 1 failed");

const edges2: Edge[] = [
  { u: 0, v: 1, w: 1 },
  { u: 1, v: 2, w: -1 },
  { u: 2, v: 0, w: -1 } // negative cycle
];
const res2 = bellmanFord(3, edges2, 0);
console.assert(res2.hasNegCycle === true, "Test 2 failed");
