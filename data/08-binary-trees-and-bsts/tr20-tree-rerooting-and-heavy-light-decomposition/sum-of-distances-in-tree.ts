/**
 * Problem: Sum of Distances in Tree (LeetCode 834)
 * Difficulty: Hard
 * Pattern: TR20 - Tree rerooting and heavy-light decomposition
 *
 * Return array ans where ans[i] is sum of distances between node i and all other nodes.
 */

// --- Optimal Approach (Tree Rerooting DP) ---
// Pass 1 (Post-order): Compute subtree sizes and distance sums from root 0.
// Pass 2 (Pre-order): Reroot from parent u to child v: ans[v] = ans[u] - count[v] + (n - count[v]).
// Time Complexity: O(n)
// Space Complexity: O(n)
export function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const count = new Array(n).fill(1);
  const ans = new Array(n).fill(0);

  // Pass 1: compute count and ans[0]
  function dfs1(u: number, parent: number): void {
    for (const v of adj[u]) {
      if (v === parent) continue;
      dfs1(v, u);
      count[u] += count[v];
      ans[u] += ans[v] + count[v];
    }
  }

  // Pass 2: reroot
  function dfs2(u: number, parent: number): void {
    for (const v of adj[u]) {
      if (v === parent) continue;
      ans[v] = ans[u] - count[v] + (n - count[v]);
      dfs2(v, u);
    }
  }

  dfs1(0, -1);
  dfs2(0, -1);

  return ans;
}

// --- Test Verification ---
console.assert(JSON.stringify(sumOfDistancesInTree(6, [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5]])) === JSON.stringify([8, 12, 6, 10, 10, 10]), "Test 1 failed");
console.assert(JSON.stringify(sumOfDistancesInTree(1, [])) === JSON.stringify([0]), "Test 2 failed");
