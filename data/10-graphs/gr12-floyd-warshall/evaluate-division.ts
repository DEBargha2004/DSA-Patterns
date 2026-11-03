/**
 * Problem: Evaluate Division (LeetCode 399)
 * Difficulty: Medium
 * Pattern: GR12 - Floyd–Warshall
 *
 * Evaluate equations A / B = k using all-pairs product paths (Floyd-Warshall style).
 */

// --- Optimal Approach (Floyd-Warshall Product Paths) ---
// Time Complexity: O(V^3 + Q)
// Space Complexity: O(V^2)
export function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const dist = new Map<string, Map<string, number>>();

  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const val = values[i];

    if (!dist.has(a)) dist.set(a, new Map());
    if (!dist.has(b)) dist.set(b, new Map());

    dist.get(a)!.set(a, 1.0);
    dist.get(b)!.set(b, 1.0);
    dist.get(a)!.set(b, val);
    dist.get(b)!.set(a, 1.0 / val);
  }

  const nodes = Array.from(dist.keys());

  // Floyd-Warshall product update
  for (const k of nodes) {
    for (const i of nodes) {
      for (const j of nodes) {
        if (dist.get(i)!.has(k) && dist.get(k)!.has(j)) {
          const direct = dist.get(i)!.get(k)! * dist.get(k)!.get(j)!;
          dist.get(i)!.set(j, direct);
        }
      }
    }
  }

  return queries.map(([c, d]) => {
    if (!dist.has(c) || !dist.has(d)) return -1.0;
    return dist.get(c)!.get(d) ?? -1.0;
  });
}

// --- Test Verification ---
const eq = [["a", "b"], ["b", "c"]];
const vals = [2.0, 3.0];
const q = [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]];
const res = calcEquation(eq, vals, q);
console.assert(res[0] === 6.0 && res[1] === 0.5 && res[2] === -1.0 && res[3] === 1.0 && res[4] === -1.0, "Test 1 failed");
