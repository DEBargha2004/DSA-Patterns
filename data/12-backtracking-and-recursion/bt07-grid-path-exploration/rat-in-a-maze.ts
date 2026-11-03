/**
 * Pattern: Grid path exploration
 * Problem: Rat in a Maze
 *
 * Find all paths from top-left (0,0) to bottom-right (N-1, N-1) in a grid
 * where 1 denotes walkable path and 0 denotes blocked. Return paths as directions 'D','L','R','U'.
 */

// Brute Force: Backtracking using visited set of string coords
// Time: O(4^(N^2)), Space: O(N^2)
export function findPathsBrute(maze: number[][]): string[] {
  const n = maze.length;
  if (maze[0][0] === 0 || maze[n - 1][n - 1] === 0) return [];
  const result: string[] = [];
  const visited = new Set<string>();

  function dfs(r: number, c: number, path: string): void {
    if (r === n - 1 && c === n - 1) {
      result.push(path);
      return;
    }

    const key = `${r},${c}`;
    visited.add(key);

    const moves: [number, number, string][] = [
      [1, 0, "D"], [0, -1, "L"], [0, 1, "R"], [-1, 0, "U"]
    ];

    for (const [dr, dc, dir] of moves) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && maze[nr][nc] === 1 && !visited.has(`${nr},${nc}`)) {
        dfs(nr, nc, path + dir);
      }
    }

    visited.delete(key);
  }

  dfs(0, 0, "");
  return result;
}

// Optimal: In-place cell mutation (mark with 0 and restore) + string buffer
// Time: O(4^(N^2)), Space: O(N^2) stack (O(1) auxiliary memory)
export function findPathsOptimal(maze: number[][]): string[] {
  const n = maze.length;
  if (maze[0][0] === 0 || maze[n - 1][n - 1] === 0) return [];
  const result: string[] = [];
  const path: string[] = [];

  function dfs(r: number, c: number): void {
    if (r === n - 1 && c === n - 1) {
      result.push(path.join(""));
      return;
    }

    maze[r][c] = 0; // Mark visited

    // Down
    if (r + 1 < n && maze[r + 1][c] === 1) {
      path.push("D");
      dfs(r + 1, c);
      path.pop();
    }
    // Left
    if (c - 1 >= 0 && maze[r][c - 1] === 1) {
      path.push("L");
      dfs(r, c - 1);
      path.pop();
    }
    // Right
    if (c + 1 < n && maze[r][c + 1] === 1) {
      path.push("R");
      dfs(r, c + 1);
      path.pop();
    }
    // Up
    if (r - 1 >= 0 && maze[r - 1][c] === 1) {
      path.push("U");
      dfs(r - 1, c);
      path.pop();
    }

    maze[r][c] = 1; // Backtrack
  }

  dfs(0, 0);
  return result;
}

// Test cases
const maze = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1]
];
const rMaze1 = findPathsBrute(maze);
const rMaze2 = findPathsOptimal(maze);
if (rMaze1.length !== 2 || rMaze2.length !== 2 || !rMaze2.includes("DDRDRR")) {
  throw new Error("Mismatch in rat in a maze");
}
console.log("Rat in a Maze passed!");
