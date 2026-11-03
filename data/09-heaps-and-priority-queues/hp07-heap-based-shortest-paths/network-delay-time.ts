/**
 * Problem: Network Delay Time (LeetCode 743)
 * Difficulty: Medium
 * Pattern: HP7 - Heap-based shortest paths
 *
 * Find time taken for all n nodes to receive signal sent from node k using Dijkstra's algorithm.
 */

// --- Optimal Approach (Dijkstra's Algorithm with Min-Heap) ---
// Time Complexity: O(E log V)
// Space Complexity: O(V + E)
export function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: [neighbor: number, weight: number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Min-heap: [distance, node]
  const pq: [dist: number, node: number][] = [[0, k]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift()!;

    if (d > dist[u]) continue;

    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }

  return maxTime;
}

// --- Test Verification ---
console.assert(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2) === 2, "Test 1 failed");
console.assert(networkDelayTime([[1, 2, 1]], 2, 1) === 1, "Test 2 failed");
console.assert(networkDelayTime([[1, 2, 1]], 2, 2) === -1, "Test 3 failed");
