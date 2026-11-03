/**
 * Problem: All-Pairs Shortest Path (Floyd-Warshall Algorithm)
 * Difficulty: Medium
 * Pattern: GR12 - Floyd–Warshall
 *
 * Compute shortest path between all pairs of vertices.
 */

// --- Optimal Approach (Floyd-Warshall O(V^3)) ---
// Time Complexity: O(V^3)
// Space Complexity: O(V^2)
export function floydWarshall(n: number, edges: number[][]): number[][] {
  const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;

  for (const [u, v, w] of edges) {
    dist[u][v] = w;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  return dist;
}

// --- Test Verification ---
const matrix = floydWarshall(3, [[0, 1, 2], [1, 2, 3], [0, 2, 8]]);
console.assert(matrix[0][2] === 5, "Test 1 failed (0 -> 1 -> 2 is 5 < 8)");
console.assert(matrix[1][0] === Infinity, "Test 2 failed");
