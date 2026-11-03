/**
 * Problem: Is Subsequence (LeetCode 392)
 * Difficulty: Easy
 * Pattern: TP10 - Multiple pointers across sequences
 *
 * Check if s is subsequence of t.
 */

// --- Optimal Approach (Two Pointers Across Different Sequences) ---
// Time Complexity: O(t.length)
// Space Complexity: O(1)
export function isSubsequence(s: string, t: string): boolean {
  let i = 0, j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) i++;
    j++;
  }
  return i === s.length;
}

// --- Test Verification ---
console.assert(isSubsequence("abc", "ahbgdc") === true, "Test 1 failed");
console.assert(isSubsequence("axc", "ahbgdc") === false, "Test 2 failed");
