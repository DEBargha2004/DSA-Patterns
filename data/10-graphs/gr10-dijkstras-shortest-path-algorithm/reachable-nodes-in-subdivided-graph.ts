/**
 * Problem: Reachable Nodes in Subdivided Graph (LeetCode 882)
 * Difficulty: Hard
 * Pattern: GR10 - Dijkstra's shortest-path algorithm
 *
 * Find reachable nodes within maxMoves after inserting intermediate nodes on edges.
 */

// --- Optimal Approach (Dijkstra on Original Nodes + Edge Usage Calculation) ---
// Time Complexity: O(E log V)
// Space Complexity: O(V + E)
export function reachableNodes(edges: number[][], maxMoves: number, n: number): number {
  const adj: [neighbor: number, weight: number][][] = Array.from({ length: n }, () => []);
  for (const [u, v, cnt] of edges) {
    adj[u].push([v, cnt + 1]);
    adj[v].push([u, cnt + 1]);
  }

  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;

  const pq: [dist: number, node: number][] = [[0, 0]];

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

  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (dist[i] <= maxMoves) ans++;
  }

  for (const [u, v, cnt] of edges) {
    const fromU = Math.max(0, maxMoves - dist[u]);
    const fromV = Math.max(0, maxMoves - dist[v]);
    ans += Math.min(cnt, fromU + fromV);
  }

  return ans;
}

// --- Test Verification ---
const e = [[0, 1, 10], [0, 2, 1], [1, 2, 2]];
console.assert(reachableNodes(e, 6, 3) === 13, "Test 1 failed");
