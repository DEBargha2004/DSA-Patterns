/**
 * Problem: Kth Smallest Number in Multiplication Table (LeetCode 668)
 * Difficulty: Hard
 * Pattern: HP10 - K-way merge
 *
 * Find kth smallest number in m x n multiplication table.
 */

// --- Optimal Approach (Binary Search over Virtual K-Way Merge) ---
// Time Complexity: O(m * log(m * n))
// Space Complexity: O(1)
export function findKthNumber(m: number, n: number, k: number): number {
  let low = 1;
  let high = m * n;

  function countLessEqual(mid: number): number {
    let count = 0;
    for (let i = 1; i <= m; i++) {
      count += Math.min(Math.floor(mid / i), n);
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
console.assert(findKthNumber(3, 3, 5) === 3, "Test 1 failed");
console.assert(findKthNumber(2, 3, 6) === 6, "Test 2 failed");
