/**
 * Pattern: Mathematical algorithms
 * Problem: Pow(x, n) (LeetCode 50)
 *
 * Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).
 */

// Brute Force: Multiply x n times
// Time: O(N), Space: O(1)
export function myPowBrute(x: number, n: number): number {
  if (n === 0) return 1;
  let exp = Math.abs(n);
  let res = 1;
  for (let i = 0; i < exp; i++) res *= x;
  return n < 0 ? 1 / res : res;
}

// Optimal: Binary Exponentiation (Exponentiation by Squaring)
// Time: O(log N), Space: O(1)
export function myPowOptimal(x: number, n: number): number {
  if (n === 0) return 1;
  let exp = Math.abs(n);
  let base = x;
  let result = 1;

  while (exp > 0) {
    if ((exp & 1) === 1) {
      result *= base;
    }
    base *= base;
    exp = Math.floor(exp / 2);
  }

  return n < 0 ? 1 / result : result;
}

// Test cases
if (Math.abs(myPowBrute(2, 10) - 1024) > 1e-6 || Math.abs(myPowOptimal(2, 10) - 1024) > 1e-6) {
  throw new Error("Expected 1024");
}
if (Math.abs(myPowOptimal(2, -2) - 0.25) > 1e-6) throw new Error("Expected 0.25");
console.log("Pow(x, n) passed!");
