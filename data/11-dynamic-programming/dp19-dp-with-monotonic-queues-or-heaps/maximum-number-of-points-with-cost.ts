/**
 * Problem: Maximum Number of Points with Cost (LeetCode 1937)
 * Difficulty: Medium
 * Pattern: DP19 - DP with monotonic queues or heaps
 *
 * Maximize points picking one cell per row with column shift penalty |c1 - c2|.
 */

// --- Optimal Approach (Left-to-Right and Right-to-Left Running Maxima DP) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function maxPoints(points: number[][]): number {
  const m = points.length;
  const n = points[0].length;
  let dp = [...points[0]];

  for (let r = 1; r < m; r++) {
    const leftMax = new Array(n);
    const rightMax = new Array(n);

    leftMax[0] = dp[0];
    for (let c = 1; c < n; c++) {
      leftMax[c] = Math.max(leftMax[c - 1] - 1, dp[c]);
    }

    rightMax[n - 1] = dp[n - 1];
    for (let c = n - 2; c >= 0; c--) {
      rightMax[c] = Math.max(rightMax[c + 1] - 1, dp[c]);
    }

    for (let c = 0; c < n; c++) {
      dp[c] = points[r][c] + Math.max(leftMax[c], rightMax[c]);
    }
  }

  return Math.max(...dp);
}

// --- Test Verification ---
const p1 = [[1, 2, 3], [1, 5, 1], [3, 1, 1]];
console.assert(maxPoints(p1) === 9, "Test 1 failed");
const p2 = [[1, 5], [2, 3], [4, 2]];
console.assert(maxPoints(p2) === 11, "Test 2 failed");
