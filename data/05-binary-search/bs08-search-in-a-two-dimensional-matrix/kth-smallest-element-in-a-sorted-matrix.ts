/**
 * Problem: Kth Smallest Element in a Sorted Matrix (LeetCode 378)
 * Difficulty: Medium
 * Pattern: BS8 - Search in a two-dimensional matrix / Binary search on range
 *
 * Find kth smallest element in matrix sorted row-wise and column-wise.
 */

// --- Optimal Approach (Binary Search over Value Range [min, max]) ---
// Time Complexity: O(n log(max - min))
// Space Complexity: O(1)
export function kthSmallest(matrix: number[][], k: number): number {
  const n = matrix.length;
  let left = matrix[0][0];
  let right = matrix[n - 1][n - 1];
  let ans = left;

  function countLessEqual(mid: number): number {
    let count = 0;
    let r = n - 1;
    let c = 0;

    // Start bottom-left, move up or right
    while (r >= 0 && c < n) {
      if (matrix[r][c] <= mid) {
        count += r + 1;
        c++;
      } else {
        r--;
      }
    }
    return count;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (countLessEqual(mid) >= k) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}

// --- Test Verification ---
const m = [
  [1, 5, 9],
  [10, 11, 13],
  [12, 13, 15]
];
console.assert(kthSmallest(m, 8) === 13, "Test 1 failed");
console.assert(kthSmallest([[-5]], 1) === -5, "Test 2 failed");
