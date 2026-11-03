/**
 * Problem: Snakes and Ladders (LeetCode 909)
 * Difficulty: Medium
 * Pattern: GR2 - BFS for shortest paths in unweighted graphs
 *
 * Find least moves to reach board destination n^2 using standard 1-6 dice.
 */

// --- Optimal Approach (1D Conversion + BFS) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
export function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const target = n * n;

  // Flatten Boustrophedon board to 1D (1-indexed)
  const flat = new Array(target + 1).fill(-1);
  let idx = 1;
  let leftToRight = true;

  for (let r = n - 1; r >= 0; r--) {
    if (leftToRight) {
      for (let c = 0; c < n; c++) flat[idx++] = board[r][c];
    } else {
      for (let c = n - 1; c >= 0; c--) flat[idx++] = board[r][c];
    }
    leftToRight = !leftToRight;
  }

  const visited = new Uint8Array(target + 1);
  const queue: [curr: number, moves: number][] = [[1, 0]];
  visited[1] = 1;

  while (queue.length > 0) {
    const [curr, moves] = queue.shift()!;
    if (curr === target) return moves;

    for (let dice = 1; dice <= 6; dice++) {
      let next = curr + dice;
      if (next > target) break;

      if (flat[next] !== -1) {
        next = flat[next];
      }

      if (!visited[next]) {
        visited[next] = 1;
        queue.push([next, moves + 1]);
      }
    }
  }

  return -1;
}

// --- Test Verification ---
const board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1]
];
console.assert(snakesAndLadders(board) === 4, "Test 1 failed");
