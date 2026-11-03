/**
 * Problem: Valid Perfect Square (LeetCode 367)
 * Difficulty: Easy
 * Pattern: BS9 - Search over monotonic predicates
 *
 * Return true if num is a perfect square, else false.
 */

// --- Optimal Approach (Binary Search Predicate) ---
// Time Complexity: O(log num)
// Space Complexity: O(1)
export function isPerfectSquare(num: number): boolean {
  let left = 1;
  let right = num;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const sq = mid * mid;
    if (sq === num) return true;
    else if (sq < num) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}

// --- Test Verification ---
console.assert(isPerfectSquare(16) === true, "Test 1 failed");
console.assert(isPerfectSquare(14) === false, "Test 2 failed");
