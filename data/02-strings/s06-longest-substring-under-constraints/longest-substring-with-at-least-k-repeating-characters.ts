/**
 * Problem: Longest Substring with At Least K Repeating Characters (LeetCode 395)
 * Difficulty: Medium
 * Pattern: S6 - Longest substring under constraints
 *
 * Given a string s and an integer k, return the length of the longest substring of s such that
 * the frequency of each character in this substring is greater than or equal to k.
 */

// --- Optimal Approach (Divide and Conquer on Invalid Characters) ---
// Time Complexity: O(26 * n) = O(n)
// Space Complexity: O(26) = O(1) recursion depth
// Any character with total count < k in current substring can NEVER be part of the valid substring.
// Split substring around all occurrences of such characters.
export function longestSubstringAtLeastK(s: string, k: number): number {
  if (s.length < k) return 0;

  const count = new Map<string, number>();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);

  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i])! < k) {
      // Split and recurse
      const parts = s.split(s[i]);
      let maxLen = 0;
      for (const part of parts) {
        maxLen = Math.max(maxLen, longestSubstringAtLeastK(part, k));
      }
      return maxLen;
    }
  }

  // If every character satisfies frequency >= k
  return s.length;
}

// --- Test Verification ---
console.assert(longestSubstringAtLeastK("aaabb", 3) === 3, "Test 1 failed");
console.assert(longestSubstringAtLeastK("ababbc", 2) === 5, "Test 2 failed");
