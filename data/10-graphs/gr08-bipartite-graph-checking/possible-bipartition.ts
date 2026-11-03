/**
 * Problem: Possible Bipartition (LeetCode 886)
 * Difficulty: Medium
 * Pattern: GR8 - Bipartite graph checking
 *
 * Split n people into two groups such that no two people in dislikes are in same group.
 */

// --- Optimal Approach (Dislike Graph 2-Coloring) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function possibleBipartition(n: number, dislikes: number[][]): boolean {
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of dislikes) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const colors = new Int8Array(n + 1);

  for (let i = 1; i <= n; i++) {
    if (colors[i] !== 0) continue;

    const queue: number[] = [i];
    colors[i] = 1;

    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const v of adj[u]) {
        if (colors[v] === 0) {
          colors[v] = -colors[u] as -1 | 1;
          queue.push(v);
        } else if (colors[v] === colors[u]) {
          return false;
        }
      }
    }
  }

  return true;
}

// --- Test Verification ---
console.assert(possibleBipartition(4, [[1, 2], [1, 3], [2, 4]]) === true, "Test 1 failed");
console.assert(possibleBipartition(3, [[1, 2], [1, 3], [2, 3]]) === false, "Test 2 failed");
