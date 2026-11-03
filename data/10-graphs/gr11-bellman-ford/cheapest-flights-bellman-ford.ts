/**
 * Problem: Cheapest Flights via K-Step Bellman-Ford
 * Difficulty: Medium
 * Pattern: GR11 - Bellman–Ford
 *
 * Find cheapest price using exact k relaxations.
 */

// --- Optimal Approach (Bellman-Ford K Iterations) ---
// Time Complexity: O(K * E)
// Space Complexity: O(V)
export function findCheapestPriceBF(n: number, flights: number[][], src: number, dst: number, k: number): number {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  for (let step = 0; step <= k; step++) {
    const nextDist = [...dist];
    for (const [u, v, price] of flights) {
      if (dist[u] !== Infinity && dist[u] + price < nextDist[v]) {
        nextDist[v] = dist[u] + price;
      }
    }
    dist = nextDist;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}

// --- Test Verification ---
const flights = [[0, 1, 100], [1, 2, 100], [0, 2, 500]];
console.assert(findCheapestPriceBF(3, flights, 0, 2, 1) === 200, "Test 1 failed");
console.assert(findCheapestPriceBF(3, flights, 0, 2, 0) === 500, "Test 2 failed");
