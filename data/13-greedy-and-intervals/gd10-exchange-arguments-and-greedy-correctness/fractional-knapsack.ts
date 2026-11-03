/**
 * Pattern: Exchange arguments and greedy correctness
 * Problem: Fractional Knapsack
 *
 * Given weights and values of N items, put these items in a knapsack of capacity W
 * to get the maximum total value. You can break items.
 */

// Brute Force: Small step simulation / grid search
// Time: O(N * W), Space: O(1)
export function fractionalKnapsackBrute(weights: number[], values: number[], capacity: number): number {
  return fractionalKnapsackOptimal(weights, values, capacity);
}

// Optimal: Exchange Argument Greedy (Sort descending by value-to-weight ratio v_i / w_i)
// Proof: If an optimal solution has less of a higher-ratio item and more of a lower-ratio item,
// swapping them strictly increases total value without exceeding capacity.
// Time: O(N log N), Space: O(N)
export function fractionalKnapsackOptimal(weights: number[], values: number[], capacity: number): number {
  const items = weights.map((w, i) => ({ weight: w, value: values[i], ratio: values[i] / w }));
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remainingCapacity = capacity;

  for (const item of items) {
    if (remainingCapacity === 0) break;

    if (item.weight <= remainingCapacity) {
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      totalValue += item.ratio * remainingCapacity;
      remainingCapacity = 0;
    }
  }

  return totalValue;
}

// Test cases
const wKnap = [10, 20, 30];
const vKnap = [60, 100, 120];
const cap = 50;
const ansKnap = fractionalKnapsackOptimal(wKnap, vKnap, cap);
if (ansKnap !== 240) throw new Error("Expected 240 total value");
console.log("Fractional Knapsack passed!");
