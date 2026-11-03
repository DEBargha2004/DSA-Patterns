/**
 * Problem: Arranging Coins (LeetCode 441)
 * Difficulty: Easy
 * Pattern: BS9 - Search over monotonic predicates
 *
 * Find total number of full staircase rows that can be built with n coins.
 */

// --- Optimal Approach (Binary Search row * (row + 1) / 2 <= n) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function arrangeCoins(n: number): number {
  let left = 1;
  let right = n;
  let ans = 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const coins = (mid * (mid + 1)) / 2;
    if (coins === n) return mid;
    else if (coins < n) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(arrangeCoins(5) === 2, "Test 1 failed");
console.assert(arrangeCoins(8) === 3, "Test 2 failed");
