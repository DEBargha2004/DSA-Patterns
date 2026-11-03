/**
 * Problem: Travelling Salesperson Problem (TSP)
 * Difficulty: Hard
 * Pattern: DP17 - Bitmask DP
 *
 * Find minimum Hamiltonian cycle visiting all n cities and returning to origin 0.
 */

// --- Optimal Approach (Held-Karp Bitmask DP: dp(mask, u)) ---
// Time Complexity: O(n^2 * 2^n)
// Space Complexity: O(n * 2^n)
export function tsp(dist: number[][]): number {
  const n = dist.length;
  const memo: number[][] = Array.from({ length: 1 << n }, () => new Array(n).fill(-1));

  function solve(mask: number, u: number): number {
    if (mask === (1 << n) - 1) {
      return dist[u][0]; // return to start
    }
    if (memo[mask][u] !== -1) return memo[mask][u];

    let minCost = Infinity;
    for (let v = 0; v < n; v++) {
      if ((mask & (1 << v)) === 0) {
        minCost = Math.min(minCost, dist[u][v] + solve(mask | (1 << v), v));
      }
    }

    memo[mask][u] = minCost;
    return minCost;
  }

  return solve(1, 0); // start at node 0 with mask 1
}

// --- Test Verification ---
const graph = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0]
];
console.assert(tsp(graph) === 80, "Test 1 failed");
