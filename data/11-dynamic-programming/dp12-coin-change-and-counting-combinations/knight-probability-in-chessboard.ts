/**
 * Problem: Knight Probability in Chessboard (LeetCode 688)
 * Difficulty: Medium
 * Pattern: DP12 - Coin change and counting combinations
 *
 * Probability that knight remains on board after k moves.
 */

// --- Optimal Approach (Rolling 2D Grid DP) ---
// Time Complexity: O(k * n^2)
// Space Complexity: O(n^2)
export function knightProbability(n: number, k: number, row: number, column: number): number {
  let dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  dp[row][column] = 1;

  const moves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  for (let step = 0; step < k; step++) {
    const nextDp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (dp[r][c] > 0) {
          for (const [dr, dc] of moves) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
              nextDp[nr][nc] += dp[r][c] / 8.0;
            }
          }
        }
      }
    }
    dp = nextDp;
  }

  let totalProb = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      totalProb += dp[r][c];
    }
  }

  return totalProb;
}

// --- Test Verification ---
const prob = knightProbability(3, 2, 0, 0);
console.assert(Math.abs(prob - 0.0625) < 1e-4, "Test 1 failed");
console.assert(knightProbability(1, 0, 0, 0) === 1, "Test 2 failed");
