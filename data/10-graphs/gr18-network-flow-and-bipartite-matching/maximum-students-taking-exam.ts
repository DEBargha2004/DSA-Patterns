/**
 * Problem: Maximum Students Taking Exam (LeetCode 1349 analog)
 * Difficulty: Hard
 * Pattern: GR18 - Network flow and bipartite matching
 *
 * Find max students who can sit without seeing each other's papers (Maximum Independent Set).
 */

// --- Optimal Approach (Bipartite Matching: Max Independent Set = Total Seats - Max Matching) ---
// Even columns only see odd columns! Thus the conflict graph is strictly BIPARTITE!
// Time Complexity: O((m * n)^2)
// Space Complexity: O(m * n)
function maxBipartiteMatching(numLeft: number, numRight: number, adj: number[][]): number {
  const matchRight = new Int32Array(numRight).fill(-1);
  let matches = 0;
  function dfs(u: number, visited: Uint8Array): boolean {
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
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
    if (dfs(u, visited)) matches++;
  }
  return matches;
}
// Even columns only see odd columns! Thus the conflict graph is strictly BIPARTITE!
// Time Complexity: O((m * n)^2)
// Space Complexity: O(m * n)
export function maxStudents(seats: string[][]): number {
  const m = seats.length;
  const n = seats[0].length;
  const leftNodes: [r: number, c: number][] = [];
  const rightNodes: [r: number, c: number][] = [];
  const rightId = Array.from({ length: m }, () => new Int32Array(n).fill(-1));

  let totalAvailable = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (seats[r][c] === ".") {
        totalAvailable++;
        if (c % 2 === 0) {
          leftNodes.push([r, c]);
        } else {
          rightId[r][c] = rightNodes.length;
          rightNodes.push([r, c]);
        }
      }
    }
  }

  const adj: number[][] = Array.from({ length: leftNodes.length }, () => []);
  const dirs = [
    [0, -1], [0, 1],
    [-1, -1], [-1, 1],
    [1, -1], [1, 1]
  ];

  for (let i = 0; i < leftNodes.length; i++) {
    const [r, c] = leftNodes[i];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && rightId[nr][nc] !== -1) {
        adj[i].push(rightId[nr][nc]);
      }
    }
  }

  const matching = maxBipartiteMatching(leftNodes.length, rightNodes.length, adj);
  return totalAvailable - matching;
}

// --- Test Verification ---
const s = [
  ["#", ".", "#", "#", ".", "#"],
  [".", "#", "#", "#", "#", "."],
  ["#", ".", "#", "#", ".", "#"]
];
console.assert(maxStudents(s) === 4, "Test 1 failed");
