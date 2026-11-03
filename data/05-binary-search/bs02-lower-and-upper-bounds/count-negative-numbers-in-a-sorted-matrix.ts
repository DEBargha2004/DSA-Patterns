/**
 * Problem: Count Negative Numbers in a Sorted Matrix (LeetCode 1351)
 * Difficulty: Easy
 * Pattern: BS2 - Lower and upper bounds
 *
 * Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise,
 * return the number of negative numbers in grid.
 */

// --- Optimal Approach (Binary Search Lower Bound per Row) ---
// Time Complexity: O(m log n)
// Space Complexity: O(1)
export function countNegatives(grid: number[][]): number {
  let count = 0;
  const n = grid[0].length;

  for (const row of grid) {
    let left = 0, right = n - 1;
    let firstNeg = n;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (row[mid] < 0) {
        firstNeg = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    count += n - firstNeg;
  }

  return count;
}

// --- Test Verification ---
const m = [[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]];
console.assert(countNegatives(m) === 8, "Test failed");
