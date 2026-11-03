/**
 * Problem: Divide Nodes Into the Maximum Number of Groups (LeetCode 2493 analog)
 * Difficulty: Hard
 * Pattern: GR8 - Bipartite graph checking
 *
 * Check bipartiteness, then find max BFS layers in each connected component.
 */

// --- Optimal Approach (Bipartite Check + Component Diameter BFS) ---
// Time Complexity: O(V * (V + E))
// Space Complexity: O(V + E)
export function magnificentSets(n: number, edges: number[][]): number {
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const colors = new Int8Array(n + 1);
  const components: number[][] = [];
  const visited = new Uint8Array(n + 1);

  // Check bipartiteness & gather components
  for (let i = 1; i <= n; i++) {
    if (colors[i] !== 0) continue;

    const comp: number[] = [];
    const queue: number[] = [i];
    colors[i] = 1;

    while (queue.length > 0) {
      const u = queue.shift()!;
      comp.push(u);
      for (const v of adj[u]) {
        if (colors[v] === 0) {
          colors[v] = -colors[u] as -1 | 1;
          queue.push(v);
        } else if (colors[v] === colors[u]) {
          return -1; // odd-length cycle means impossible
        }
      }
    }
    components.push(comp);
  }

  // Find max BFS depth from any starting node in component
  function maxDepthFrom(start: number): number {
    const dist = new Int32Array(n + 1).fill(-1);
    const q: number[] = [start];
    dist[start] = 1;
    let maxD = 1;

    while (q.length > 0) {
      const u = q.shift()!;
      for (const v of adj[u]) {
        if (dist[v] === -1) {
          dist[v] = dist[u] + 1;
          maxD = Math.max(maxD, dist[v]);
          q.push(v);
        }
      }
    }
    return maxD;
  }

  let totalGroups = 0;
  for (const comp of components) {
    let maxCompGroups = 0;
    for (const node of comp) {
      maxCompGroups = Math.max(maxCompGroups, maxDepthFrom(node));
    }
    totalGroups += maxCompGroups;
  }

  return totalGroups;
}

// --- Test Verification ---
const e1 = [[1, 2], [1, 4], [1, 5], [2, 6], [2, 3], [4, 6]];
console.assert(magnificentSets(6, e1) === 4, "Test 1 failed");
console.assert(magnificentSets(3, [[1, 2], [2, 3], [3, 1]]) === -1, "Test 2 failed");
