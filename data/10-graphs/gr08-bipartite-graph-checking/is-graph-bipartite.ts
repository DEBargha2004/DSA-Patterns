/**
 * Problem: Is Graph Bipartite? (LeetCode 785)
 * Difficulty: Medium
 * Pattern: GR8 - Bipartite graph checking
 *
 * Determine if graph is bipartite (2-colorable with no monochromatic edge).
 */

// --- Optimal Approach (2-Coloring BFS) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V)
export function isBipartite(graph: number[][]): boolean {
  const n = graph.length;
  const colors = new Int8Array(n); // 0=uncolored, 1=color1, -1=color2

  for (let i = 0; i < n; i++) {
    if (colors[i] !== 0) continue;

    const queue: number[] = [i];
    colors[i] = 1;

    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const v of graph[u]) {
        if (colors[v] === 0) {
          colors[v] = -colors[u] as -1 | 1;
          queue.push(v);
        } else if (colors[v] === colors[u]) {
          return false; // odd cycle found!
        }
      }
    }
  }

  return true;
}

// --- Test Verification ---
console.assert(isBipartite([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]) === false, "Test 1 failed");
console.assert(isBipartite([[1, 3], [0, 2], [1, 3], [0, 2]]) === true, "Test 2 failed");
