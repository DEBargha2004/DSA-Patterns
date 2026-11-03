/**
 * Problem: Course Schedule (LeetCode 207)
 * Difficulty: Medium
 * Pattern: GR5 - Cycle detection in directed graphs
 *
 * Determine if you can finish all courses given prerequisites.
 */

// --- Optimal Approach (3-Color DFS Cycle Detection) ---
// 0: Unvisited, 1: Visiting (in current recursion path), 2: Visited (safe)
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
  }

  const state = new Uint8Array(numCourses); // 0=unvisited, 1=visiting, 2=visited

  function hasCycle(u: number): boolean {
    state[u] = 1;

    for (const v of adj[u]) {
      if (state[v] === 1) return true; // cycle detected!
      if (state[v] === 0 && hasCycle(v)) return true;
    }

    state[u] = 2;
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (hasCycle(i)) return false;
    }
  }

  return true;
}

// --- Test Verification ---
console.assert(canFinish(2, [[1, 0]]) === true, "Test 1 failed");
console.assert(canFinish(2, [[1, 0], [0, 1]]) === false, "Test 2 failed");
