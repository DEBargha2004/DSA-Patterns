/**
 * Problem: Fibonacci Number (LeetCode 509)
 * Difficulty: Easy
 * Pattern: DP1 - Recognize overlapping subproblems
 *
 * Calculate F(n) where F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2).
 */

// --- Optimal Approach (O(1) Space DP) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function fib(n: number): number {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }

  return b;
}

// --- Test Verification ---
console.assert(fib(2) === 1, "Test 1 failed");
console.assert(fib(3) === 2, "Test 2 failed");
console.assert(fib(4) === 3, "Test 3 failed");
