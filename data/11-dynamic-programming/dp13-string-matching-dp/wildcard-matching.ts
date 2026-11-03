/**
 * Problem: Wildcard Matching (LeetCode 44)
 * Difficulty: Hard
 * Pattern: DP13 - String matching DP
 *
 * Support '?' (matches any single character) and '*' (matches any sequence of characters).
 */

// --- Optimal Approach (2D Boolean DP) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n) space-optimized
export function isMatchWildcard(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;
  let dp = new Array(n + 1).fill(false);
  dp[0] = true;

  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[j] = dp[j - 1];
  }

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1).fill(false);
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        nextDp[j] = nextDp[j - 1] || dp[j];
      } else if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
        nextDp[j] = dp[j - 1];
      }
    }
    dp = nextDp;
  }

  return dp[n];
}

// --- Test Verification ---
console.assert(isMatchWildcard("aa", "a") === false, "Test 1 failed");
console.assert(isMatchWildcard("aa", "*") === true, "Test 2 failed");
console.assert(isMatchWildcard("cb", "?a") === false, "Test 3 failed");
console.assert(isMatchWildcard("adceb", "*a*b") === true, "Test 4 failed");
