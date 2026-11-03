/**
 * Problem: Cheapest Flights Within K Stops (LeetCode 787)
 * Difficulty: Medium
 * Pattern: GR10 - Dijkstra's shortest-path algorithm
 *
 * Find cheapest price from src to dst with at most k stops.
 */

// --- Optimal Approach (Modified Dijkstra with Stops Tracking) ---
// Time Complexity: O(k * E log(k * V))
// Space Complexity: O(V)
export function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  let cost = new Array(n).fill(Infinity);
  cost[src] = 0;

  for (let i = 0; i <= k; i++) {
    const tempCost = [...cost];
    for (const [u, v, price] of flights) {
      if (cost[u] !== Infinity && cost[u] + price < tempCost[v]) {
        tempCost[v] = cost[u] + price;
      }
    }
    cost = tempCost;
  }

  return cost[dst] === Infinity ? -1 : cost[dst];
}

// --- Test Verification ---
const f = [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]];
console.assert(findCheapestPrice(4, f, 0, 3, 1) === 700, "Test 1 failed");
console.assert(findCheapestPrice(4, f, 0, 3, 0) === -1, "Test 2 failed");
