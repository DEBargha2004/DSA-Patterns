/**
 * Problem: Regular Expression Matching (LeetCode 10)
 * Difficulty: Hard
 * Pattern: DP13 - String matching DP
 *
 * Support '.' (any single character) and '*' (zero or more of the preceding element).
 */

// --- Optimal Approach (2D Matrix DP) ---
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
export function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;
  const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  // Handle patterns with '*' matching empty string
  for (let j = 2; j <= n; j += 2) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        // Zero occurrences of preceding char
        dp[i][j] = dp[i][j - 2];
        // One or more occurrences if preceding char matches
        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      } else if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}

// --- Test Verification ---
console.assert(isMatch("aa", "a") === false, "Test 1 failed");
console.assert(isMatch("aa", "a*") === true, "Test 2 failed");
console.assert(isMatch("ab", ".*") === true, "Test 3 failed");
console.assert(isMatch("aab", "c*a*b") === true, "Test 4 failed");
