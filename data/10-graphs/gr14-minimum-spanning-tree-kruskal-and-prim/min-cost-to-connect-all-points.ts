/**
 * Problem: Min Cost to Connect All Points (LeetCode 1584)
 * Difficulty: Medium
 * Pattern: GR14 - Minimum spanning tree: Kruskal and Prim
 *
 * Find minimum cost to connect all points with Manhattan distance edges.
 */

// --- Optimal Approach (Prim's Algorithm - O(V^2)) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  const minDist = new Array(n).fill(Infinity);
  const visited = new Uint8Array(n);
  minDist[0] = 0;
  let totalCost = 0;

  for (let step = 0; step < n; step++) {
    let curr = -1;
    let currDist = Infinity;

    // Pick unvisited node with smallest distance
    for (let i = 0; i < n; i++) {
      if (!visited[i] && minDist[i] < currDist) {
        currDist = minDist[i];
        curr = i;
      }
    }

    visited[curr] = 1;
    totalCost += currDist;

    // Update distances to unvisited neighbors
    for (let next = 0; next < n; next++) {
      if (!visited[next]) {
        const d = Math.abs(points[curr][0] - points[next][0]) + Math.abs(points[curr][1] - points[next][1]);
        if (d < minDist[next]) {
          minDist[next] = d;
        }
      }
    }
  }

  return totalCost;
}

// --- Test Verification ---
const pts1 = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]];
console.assert(minCostConnectPoints(pts1) === 20, "Test 1 failed");
const pts2 = [[3, 12], [-2, 5], [-4, 1]];
console.assert(minCostConnectPoints(pts2) === 18, "Test 2 failed");
