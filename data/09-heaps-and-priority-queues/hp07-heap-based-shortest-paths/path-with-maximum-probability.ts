/**
 * Problem: Path with Maximum Probability (LeetCode 1514)
 * Difficulty: Medium
 * Pattern: HP7 - Heap-based shortest paths
 *
 * Find maximum probability path from start to end using Dijkstra's algorithm.
 */

// --- Optimal Approach (Dijkstra with Max-Heap) ---
// Time Complexity: O(E log V)
// Space Complexity: O(V + E)
export function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
  const adj: [neighbor: number, prob: number][][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const prob = succProb[i];
    adj[u].push([v, prob]);
    adj[v].push([u, prob]);
  }

  const maxProb = new Array(n).fill(0);
  maxProb[start] = 1;

  // Max-heap: [prob, node]
  const pq: [prob: number, node: number][] = [[1, start]];

  while (pq.length > 0) {
    pq.sort((a, b) => b[0] - a[0]);
    const [prob, u] = pq.shift()!;

    if (u === end) return prob;
    if (prob < maxProb[u]) continue;

    for (const [v, p] of adj[u]) {
      const newProb = prob * p;
      if (newProb > maxProb[v]) {
        maxProb[v] = newProb;
        pq.push([newProb, v]);
      }
    }
  }

  return 0;
}

// --- Test Verification ---
const p = maxProbability(3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2);
console.assert(Math.abs(p - 0.25) < 1e-5, "Test 1 failed");
console.assert(maxProbability(3, [[0, 1]], [0.5], 0, 2) === 0, "Test 2 failed");
