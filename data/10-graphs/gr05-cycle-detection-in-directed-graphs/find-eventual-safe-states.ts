/**
 * Problem: Find Eventual Safe States (LeetCode 802)
 * Difficulty: Medium
 * Pattern: GR5 - Cycle detection in directed graphs
 *
 * Return sorted array of nodes that are not part of any cycle.
 */

// --- Optimal Approach (3-Color DFS) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V)
export function eventualSafeNodes(graph: number[][]): number[] {
  const n = graph.length;
  const color = new Uint8Array(n); // 0=unvisited, 1=unsafe/visiting, 2=safe

  function isSafe(u: number): boolean {
    if (color[u] !== 0) return color[u] === 2;

    color[u] = 1;
    for (const v of graph[u]) {
      if (!isSafe(v)) return false;
    }

    color[u] = 2;
    return true;
  }

  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    if (isSafe(i)) {
      result.push(i);
    }
  }

  return result;
}

// --- Test Verification ---
const g = [[1, 2], [2, 3], [5], [0], [5], [], []];
console.assert(JSON.stringify(eventualSafeNodes(g)) === JSON.stringify([2, 4, 5, 6]), "Test 1 failed");
