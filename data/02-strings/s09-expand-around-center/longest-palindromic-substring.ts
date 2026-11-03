/**
 * Problem: Longest Palindromic Substring (LeetCode 5)
 * Difficulty: Medium
 * Pattern: S9 - Expand around center
 *
 * Given a string s, return the longest palindromic substring in s.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^3) - check all substrings
// Space Complexity: O(1)
export function longestPalindromeBruteForce(s: string): string {
  let longest = "";
  function isPal(sub: string): boolean {
    let l = 0, r = sub.length - 1;
    while (l < r) {
      if (sub[l] !== sub[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sub = s.slice(i, j + 1);
      if (sub.length > longest.length && isPal(sub)) {
        longest = sub;
      }
    }
  }

  return longest;
}

// --- 2. Optimal Approach (Expand Around 2n - 1 Centers) ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function longestPalindromeOptimal(s: string): string {
  if (s.length <= 1) return s;

  let start = 0;
  let maxLen = 1;

  function expand(left: number, right: number): void {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLen = right - left + 1;
      if (currentLen > maxLen) {
        maxLen = currentLen;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd-length palindromes (single char center)
    expand(i, i + 1); // Even-length palindromes (between two chars)
  }

  return s.substring(start, start + maxLen);
}

// --- Test Verification ---
const p1 = longestPalindromeOptimal("babad");
console.assert(p1 === "bab" || p1 === "aba", "Test 1 failed");
console.assert(longestPalindromeOptimal("cbbd") === "bb", "Test 2 failed");
