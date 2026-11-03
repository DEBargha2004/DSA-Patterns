/**
 * Pattern: Mathematical algorithms
 * Problem: Greatest Common Divisor and LCM
 *
 * Compute GCD using Euclidean algorithm and LCM using (a * b) / GCD(a, b).
 */

// Brute Force: Linear search from min(a, b) downwards
// Time: O(min(a, b)), Space: O(1)
export function gcdBrute(a: number, b: number): number {
  for (let d = Math.min(a, b); d >= 1; d--) {
    if (a % d === 0 && b % d === 0) return d;
  }
  return 1;
}

// Optimal: Euclidean Algorithm (Iterative remainder)
// Time: O(log(min(a, b))), Space: O(1)
export function gcdOptimal(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcdOptimal(a, b)) * b);
}

// Test cases
if (gcdBrute(48, 18) !== 6 || gcdOptimal(48, 18) !== 6) throw new Error("Expected GCD 6");
if (lcm(12, 18) !== 36) throw new Error("Expected LCM 36");
console.log("GCD and LCM passed!");
