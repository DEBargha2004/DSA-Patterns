/**
 * Problem: Time Needed to Inform All Employees (LeetCode 1376)
 * Difficulty: Medium
 * Pattern: TR20 - Tree rerooting and heavy-light decomposition
 *
 * Find total time to inform all employees starting from headID.
 */

// --- Optimal Approach (Tree DFS / Tree DP) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    if (manager[i] !== -1) {
      adj[manager[i]].push(i);
    }
  }

  function dfs(curr: number): number {
    let maxChildTime = 0;
    for (const subordinate of adj[curr]) {
      maxChildTime = Math.max(maxChildTime, dfs(subordinate));
    }
    return informTime[curr] + maxChildTime;
  }

  return dfs(headID);
}

// --- Test Verification ---
console.assert(numOfMinutes(1, 0, [-1], [0]) === 0, "Test 1 failed");
console.assert(numOfMinutes(6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0]) === 1, "Test 2 failed");
