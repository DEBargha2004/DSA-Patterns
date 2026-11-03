/**
 * Problem: Tree Diameter via DP (LeetCode 1245 analog)
 * Difficulty: Medium
 * Pattern: DP15 - Tree DP
 *
 * Find diameter of an undirected general tree using DP.
 */

// --- Optimal Approach (Bottom-up Tree DP tracking top 2 longest paths) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function treeDiameter(edges: number[][]): number {
  const n = edges.length + 1;
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  let diameter = 0;

  function dfs(u: number, parent: number): number {
    let top1 = 0;
    let top2 = 0;

    for (const v of adj[u]) {
      if (v === parent) continue;
      const depth = 1 + dfs(v, u);
      if (depth > top1) {
        top2 = top1;
        top1 = depth;
      } else if (depth > top2) {
        top2 = depth;
      }
    }

    diameter = Math.max(diameter, top1 + top2);
    return top1;
  }

  dfs(0, -1);
  return diameter;
}

// --- Test Verification ---
console.assert(treeDiameter([[0, 1], [0, 2]]) === 2, "Test 1 failed");
console.assert(treeDiameter([[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]]) === 4, "Test 2 failed");
