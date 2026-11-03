/**
 * Problem: Find the City With the Smallest Number of Neighbors at a Threshold Distance (LeetCode 1334)
 * Difficulty: Medium
 * Pattern: GR12 - Floyd–Warshall
 *
 * Return city with smallest reachable neighbors within distanceThreshold.
 */

// --- Optimal Approach (Floyd-Warshall All-Pairs Shortest Path) ---
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)
export function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
  const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;

  for (const [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w;
  }

  // Floyd-Warshall DP
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  let minCount = Infinity;
  let bestCity = -1;

  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] <= distanceThreshold) {
        count++;
      }
    }
    if (count <= minCount) {
      minCount = count;
      bestCity = i; // tie breaks favoring greater city index
    }
  }

  return bestCity;
}

// --- Test Verification ---
const edges = [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]];
console.assert(findTheCity(4, edges, 4) === 3, "Test 1 failed");
