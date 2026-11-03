/**
 * Problem: All Paths From Source to Target (LeetCode 797)
 * Difficulty: Medium
 * Pattern: GR1 - Graph representation and traversal
 *
 * Find all paths from node 0 to node n-1 in a DAG.
 */

// --- Optimal Approach (DFS Backtracking on DAG) ---
// Time Complexity: O(2^V * V)
// Space Complexity: O(V) recursion stack
export function allPathsSourceTarget(graph: number[][]): number[][] {
  const target = graph.length - 1;
  const result: number[][] = [];
  const currentPath: number[] = [0];

  function dfs(u: number): void {
    if (u === target) {
      result.push([...currentPath]);
      return;
    }

    for (const v of graph[u]) {
      currentPath.push(v);
      dfs(v);
      currentPath.pop();
    }
  }

  dfs(0);
  return result;
}

// --- Test Verification ---
const g1 = [[1, 2], [3], [3], []];
console.assert(JSON.stringify(allPathsSourceTarget(g1)) === JSON.stringify([[0, 1, 3], [0, 2, 3]]), "Test 1 failed");
const g2 = [[4, 3, 1], [3, 2, 4], [3], [4], []];
console.assert(allPathsSourceTarget(g2).length === 5, "Test 2 failed");
