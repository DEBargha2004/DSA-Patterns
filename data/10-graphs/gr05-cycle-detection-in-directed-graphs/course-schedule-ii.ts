/**
 * Problem: Course Schedule II (LeetCode 210)
 * Difficulty: Medium
 * Pattern: GR5 - Cycle detection in directed graphs
 *
 * Return ordering of courses to finish all courses, or empty array if cycle exists.
 */

// --- Optimal Approach (Kahn's In-Degree BFS Algorithm) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const inDegree = new Int32Array(numCourses);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order: number[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);

    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  return order.length === numCourses ? order : [];
}

// --- Test Verification ---
const o1 = findOrder(2, [[1, 0]]);
console.assert(JSON.stringify(o1) === JSON.stringify([0, 1]), "Test 1 failed");
const o2 = findOrder(2, [[1, 0], [0, 1]]);
console.assert(JSON.stringify(o2) === JSON.stringify([]), "Test 2 failed (cycle)");
