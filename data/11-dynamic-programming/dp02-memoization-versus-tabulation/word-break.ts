/**
 * Problem: Word Break (LeetCode 139)
 * Difficulty: Medium
 * Pattern: DP2 - Memoization versus tabulation
 *
 * Determine if string s can be segmented into space-separated dictionary words.
 */

// --- Optimal Approach (Tabulation DP: dp[i] indicates if s[0...i] is segmentable) ---
// Time Complexity: O(n^2 * L) where L is max word length
// Space Complexity: O(n + W)
export function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const dp = new Uint8Array(n + 1);
  dp[0] = 1; // base case: empty string

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = 1;
        break;
      }
    }
  }

  return dp[n] === 1;
}

// --- Test Verification ---
console.assert(wordBreak("leetcode", ["leet", "code"]) === true, "Test 1 failed");
console.assert(wordBreak("applepenapple", ["apple", "pen"]) === true, "Test 2 failed");
console.assert(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]) === false, "Test 3 failed");
