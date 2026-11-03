/**
 * Problem: Maximum Bipartite Matching (Augmenting Paths Algorithm)
 * Difficulty: Hard
 * Pattern: GR18 - Network flow and bipartite matching
 *
 * Find maximum number of matching edges between two disjoint sets of vertices.
 */

// --- Optimal Approach (Augmenting Paths via DFS) ---
// Time Complexity: O(V * E)
// Space Complexity: O(V)
export function maxBipartiteMatching(numLeft: number, numRight: number, adj: number[][]): number {
  const matchRight = new Int32Array(numRight).fill(-1);
  let matches = 0;

  function dfs(u: number, visited: Uint8Array): boolean {
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
        // If v is not matched or previously matched partner can find another match
        if (matchRight[v] === -1 || dfs(matchRight[v], visited)) {
          matchRight[v] = u;
          return true;
        }
      }
    }
    return false;
  }

  for (let u = 0; u < numLeft; u++) {
    const visited = new Uint8Array(numRight);
    if (dfs(u, visited)) {
      matches++;
    }
  }

  return matches;
}

// --- Test Verification ---
const adj = [[0, 1], [0], [2]];
console.assert(maxBipartiteMatching(3, 3, adj) === 3, "Test 1 failed");
