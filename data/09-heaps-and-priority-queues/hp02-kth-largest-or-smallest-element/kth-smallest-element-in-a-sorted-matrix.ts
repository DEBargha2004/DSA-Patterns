/**
 * Problem: Kth Smallest Element in a Sorted Matrix (LeetCode 378)
 * Difficulty: Medium
 * Pattern: HP2 - Kth largest or smallest element
 *
 * Given n x n matrix where each row and col is sorted in ascending order, find kth smallest element.
 */

// --- Optimal Approach (Binary Search on Value Range) ---
// Time Complexity: O(n * log(max - min))
// Space Complexity: O(1)
export function kthSmallest(matrix: number[][], k: number): number {
  const n = matrix.length;
  let low = matrix[0][0];
  let high = matrix[n - 1][n - 1];

  function countLessEqual(mid: number): number {
    let count = 0;
    let r = n - 1;
    let c = 0;

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

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (countLessEqual(mid) < k) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

// --- Test Verification ---
const mat = [
  [1, 5, 9],
  [10, 11, 13],
  [12, 13, 15]
];
console.assert(kthSmallest(mat, 8) === 13, "Test 1 failed");
console.assert(kthSmallest([[-5]], 1) === -5, "Test 2 failed");
