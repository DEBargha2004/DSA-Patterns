/**
 * Problem: Climbing Stairs (LeetCode 70)
 * Difficulty: Easy
 * Pattern: DP1 - Recognize overlapping subproblems
 *
 * Each time you can either climb 1 or 2 steps. How many distinct ways to reach the top?
 */

// --- Brute Force Approach (Exponential Recursion) ---
// Time Complexity: O(2^n)
// Space Complexity: O(n)
export function climbStairsBrute(n: number): number {
  if (n <= 2) return n;
  return climbStairsBrute(n - 1) + climbStairsBrute(n - 2);
}

// --- Optimal Approach (Space-Optimized DP: Fibonacci State) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// --- Test Verification ---
console.assert(climbStairsBrute(3) === 3, "Brute failed");
console.assert(climbStairs(2) === 2, "Test 1 failed");
console.assert(climbStairs(3) === 3, "Test 2 failed");
console.assert(climbStairs(5) === 8, "Test 3 failed");
