/**
 * Problem: Is Subsequence (LeetCode 392)
 * Difficulty: Easy
 * Pattern: S15 - Subsequence matching
 *
 * Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
 */

// --- Optimal Approach (Greedy Two Pointers) ---
// Time Complexity: O(t.length)
// Space Complexity: O(1)
export function isSubsequence(s: string, t: string): boolean {
  let sPtr = 0;
  let tPtr = 0;

  while (sPtr < s.length && tPtr < t.length) {
    if (s[sPtr] === t[tPtr]) {
      sPtr++;
    }
    tPtr++;
  }

  return sPtr === s.length;
}

// --- Test Verification ---
console.assert(isSubsequence("abc", "ahbgdc") === true, "Test 1 failed");
console.assert(isSubsequence("axc", "ahbgdc") === false, "Test 2 failed");
