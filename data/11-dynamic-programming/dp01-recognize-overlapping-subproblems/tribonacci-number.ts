/**
 * Problem: N-th Tribonacci Number (LeetCode 1137)
 * Difficulty: Easy
 * Pattern: DP1 - Recognize overlapping subproblems
 *
 * T(0) = 0, T(1) = 1, T(2) = 1, and T(n+3) = T(n) + T(n+1) + T(n+2).
 */

// --- Optimal Approach (Rolling 3 Variables) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function tribonacci(n: number): number {
  if (n === 0) return 0;
  if (n <= 2) return 1;

  let t0 = 0, t1 = 1, t2 = 1;

  for (let i = 3; i <= n; i++) {
    const next = t0 + t1 + t2;
    t0 = t1;
    t1 = t2;
    t2 = next;
  }

  return t2;
}

// --- Test Verification ---
console.assert(tribonacci(4) === 4, "Test 1 failed");
console.assert(tribonacci(25) === 1389537, "Test 2 failed");
