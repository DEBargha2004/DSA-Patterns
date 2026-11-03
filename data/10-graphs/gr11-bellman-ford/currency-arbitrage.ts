/**
 * Problem: Currency Arbitrage Detection
 * Difficulty: Hard
 * Pattern: GR11 - Bellman–Ford
 *
 * Detect arbitrage: product of exchange rates along cycle > 1, by setting weights w = -log(rate).
 */

// --- Optimal Approach (Negative Cycle Detection on -log(rates)) ---
// Time Complexity: O(V * E)
// Space Complexity: O(V)
export function detectArbitrage(rates: number[][]): boolean {
  const n = rates.length;
  const dist = new Array(n).fill(0);

  // Relax edges n - 1 times
  for (let iter = 1; iter <= n - 1; iter++) {
    for (let u = 0; u < n; u++) {
      for (let v = 0; v < n; v++) {
        if (rates[u][v] > 0) {
          const weight = -Math.log(rates[u][v]);
          if (dist[u] + weight < dist[v]) {
            dist[v] = dist[u] + weight;
          }
        }
      }
    }
  }

  // Detect negative cycle
  for (let u = 0; u < n; u++) {
    for (let v = 0; v < n; v++) {
      if (rates[u][v] > 0) {
        const weight = -Math.log(rates[u][v]);
        if (dist[u] + weight < dist[v] - 1e-9) {
          return true; // arbitrage opportunity exists!
        }
      }
    }
  }

  return false;
}

// --- Test Verification ---
// 1 USD = 0.9 EUR, 1 EUR = 140 JPY, 1 JPY = 0.0085 USD -> 0.9 * 140 * 0.0085 = 1.071 > 1.0 (Arbitrage!)
const r = [
  [1.0, 0.9, 0],
  [0, 1.0, 140],
  [0.0085, 0, 1.0]
];
console.assert(detectArbitrage(r) === true, "Test 1 failed");
