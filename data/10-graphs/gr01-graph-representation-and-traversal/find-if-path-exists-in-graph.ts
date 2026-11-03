/**
 * Problem: Find if Path Exists in Graph (LeetCode 1971)
 * Difficulty: Easy
 * Pattern: GR1 - Graph representation and traversal
 *
 * Determine if there is a valid path that exists from source to destination.
 */

// --- Optimal Approach (BFS Traversal) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  if (source === destination) return true;

  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Uint8Array(n);
  const queue: number[] = [source];
  visited[source] = 1;

  while (queue.length > 0) {
    const u = queue.shift()!;
    if (u === destination) return true;

    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
        queue.push(v);
      }
    }
  }

  return false;
}

// --- Test Verification ---
console.assert(validPath(3, [[0, 1], [1, 2], [2, 0]], 0, 2) === true, "Test 1 failed");
console.assert(validPath(6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5) === false, "Test 2 failed");
