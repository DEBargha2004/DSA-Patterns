/**
 * Problem: Find the Kth Smallest Sum of a Matrix With Sorted Rows (LeetCode 1439)
 * Difficulty: Hard
 * Pattern: HP4 - Merge K sorted sequences
 *
 * Return kth smallest array sum formed by taking one element from each row.
 */

// --- Optimal Approach (Row-by-Row K-Smallest Sum Merging) ---
// Time Complexity: O(m * k * n * log(k))
// Space Complexity: O(k)
export function kthSmallestSum(mat: number[][], k: number): number {
  let prevRowSums = [0];

  for (const row of mat) {
    const currentSums: number[] = [];
    for (const sum of prevRowSums) {
      for (const val of row) {
        currentSums.push(sum + val);
      }
    }
    currentSums.sort((a, b) => a - b);
    prevRowSums = currentSums.slice(0, k);
  }

  return prevRowSums[k - 1];
}

// --- Test Verification ---
const mat = [[1, 3, 11], [2, 4, 6]];
console.assert(kthSmallestSum(mat, 5) === 7, "Test 1 failed");
