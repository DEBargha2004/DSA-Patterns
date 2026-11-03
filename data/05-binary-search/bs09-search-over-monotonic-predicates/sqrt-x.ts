/**
 * Problem: Sqrt(x) (LeetCode 69)
 * Difficulty: Easy
 * Pattern: BS9 - Search over monotonic predicates
 *
 * Compute and return the square root of x truncated to an integer.
 */

// --- Optimal Approach (Binary Search over [0, x]) ---
// Time Complexity: O(log x)
// Space Complexity: O(1)
export function mySqrt(x: number): number {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);
  let ans = 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (mid * mid === x) return mid;
    else if (mid * mid < x) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(mySqrt(4) === 2, "Test 1 failed");
console.assert(mySqrt(8) === 2, "Test 2 failed");
