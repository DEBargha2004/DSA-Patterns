/**
 * Problem: Decode Ways (LeetCode 91)
 * Difficulty: Medium
 * Pattern: DP2 - Memoization versus tabulation
 *
 * Decode message mapped 'A'->1 ... 'Z'->26.
 */

// --- Optimal Approach (Space-Optimized Tabulation) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function numDecodings(s: string): number {
  if (s.length === 0 || s[0] === "0") return 0;

  let prev2 = 1; // dp[i-2]
  let prev1 = 1; // dp[i-1]

  for (let i = 1; i < s.length; i++) {
    let curr = 0;
    const single = Number(s[i]);
    const double = Number(s.slice(i - 1, i + 1));

    if (single >= 1 && single <= 9) {
      curr += prev1;
    }
    if (double >= 10 && double <= 26) {
      curr += prev2;
    }

    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// --- Test Verification ---
console.assert(numDecodings("12") === 2, "Test 1 failed");
console.assert(numDecodings("226") === 3, "Test 2 failed");
console.assert(numDecodings("06") === 0, "Test 3 failed");
