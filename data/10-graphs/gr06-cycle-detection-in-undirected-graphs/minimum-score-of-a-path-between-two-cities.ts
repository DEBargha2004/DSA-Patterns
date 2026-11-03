/**
 * Problem: Minimum Score of a Path Between Two Cities (LeetCode 2492)
 * Difficulty: Medium
 * Pattern: GR6 - Cycle detection in undirected graphs
 *
 * Find minimum edge weight in connected component containing city 1 and city n.
 */

// --- Optimal Approach (BFS over Connected Component) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function minScore(n: number, roads: number[][]): number {
  const adj: [neighbor: number, weight: number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of roads) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  let minRoad = Infinity;
  const visited = new Uint8Array(n + 1);
  const queue: number[] = [1];
  visited[1] = 1;

  while (queue.length > 0) {
    const u = queue.shift()!;
    for (const [v, w] of adj[u]) {
      minRoad = Math.min(minRoad, w);
      if (!visited[v]) {
        visited[v] = 1;
        queue.push(v);
      }
    }
  }

  return minRoad;
}

// --- Test Verification ---
const r1 = minScore(4, [[1, 2, 9], [2, 3, 6], [2, 4, 5], [1, 4, 7]]);
console.assert(r1 === 5, "Test 1 failed");
