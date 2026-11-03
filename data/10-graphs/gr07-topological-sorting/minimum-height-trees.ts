/**
 * Problem: Minimum Height Trees (LeetCode 310)
 * Difficulty: Medium
 * Pattern: GR7 - Topological sorting
 *
 * Find all roots of minimum height trees by peeling leaves inward.
 */

// --- Optimal Approach (Inward Leaf Peeling BFS) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function findMinHeightTrees(n: number, edges: number[][]): number[] {
  if (n === 1) return [0];

  const adj: Set<number>[] = Array.from({ length: n }, () => new Set());
  for (const [u, v] of edges) {
    adj[u].add(v);
    adj[v].add(u);
  }

  let leaves: number[] = [];
  for (let i = 0; i < n; i++) {
    if (adj[i].size === 1) leaves.push(i);
  }

  let remainingNodes = n;
  while (remainingNodes > 2) {
    remainingNodes -= leaves.length;
    const newLeaves: number[] = [];

    for (const leaf of leaves) {
      const neighbor = adj[leaf].values().next().value!;
      adj[neighbor].delete(leaf);
      if (adj[neighbor].size === 1) {
        newLeaves.push(neighbor);
      }
    }

    leaves = newLeaves;
  }

  return leaves;
}

// --- Test Verification ---
const r1 = findMinHeightTrees(4, [[1, 0], [1, 2], [1, 3]]);
console.assert(JSON.stringify(r1) === JSON.stringify([1]), "Test 1 failed");
const r2 = findMinHeightTrees(6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]);
console.assert(JSON.stringify(r2.sort()) === JSON.stringify([3, 4]), "Test 2 failed");
