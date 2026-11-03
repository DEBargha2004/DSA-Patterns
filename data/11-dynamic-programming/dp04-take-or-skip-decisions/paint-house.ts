/**
 * Problem: Paint House (LeetCode 256 analog)
 * Difficulty: Medium
 * Pattern: DP4 - Take-or-skip decisions
 *
 * Paint n houses with 3 colors so no two adjacent houses have same color.
 */

// --- Optimal Approach (Rolling DP over 3 Colors) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function minCost(costs: number[][]): number {
  if (costs.length === 0) return 0;
  let [r, g, b] = costs[0];

  for (let i = 1; i < costs.length; i++) {
    const nextR = costs[i][0] + Math.min(g, b);
    const nextG = costs[i][1] + Math.min(r, b);
    const nextB = costs[i][2] + Math.min(r, g);
    r = nextR;
    g = nextG;
    b = nextB;
  }

  return Math.min(r, g, b);
}

// --- Test Verification ---
const c = [[17, 2, 17], [16, 16, 5], [14, 3, 19]];
console.assert(minCost(c) === 10, "Test 1 failed (2 + 5 + 3 = 10)");
