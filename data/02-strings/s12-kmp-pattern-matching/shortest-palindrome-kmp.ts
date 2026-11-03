/**
 * Problem: Shortest Palindrome via KMP (LeetCode 214)
 * Difficulty: Hard
 * Pattern: S12 - KMP pattern matching
 *
 * Find the longest palindromic prefix of s using KMP LPS table on `s + '#' + reverse(s)`.
 */

// --- Optimal Approach (KMP LPS on Combined String) ---
// Time Complexity: O(n) - strict linear time
// Space Complexity: O(n)
export function shortestPalindromeKMP(s: string): string {
  const rev = s.split('').reverse().join('');
  const combined = s + '#' + rev;
  const n = combined.length;
  const lps = new Array<number>(n).fill(0);
  let len = 0;
  let i = 1;

  while (i < n) {
    if (combined[i] === combined[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  const longestPalPrefixLen = lps[n - 1];
  const toPrepend = rev.substring(0, s.length - longestPalPrefixLen);
  return toPrepend + s;
}

// --- Test Verification ---
console.assert(shortestPalindromeKMP("aacecaaa") === "aaacecaaa", "Test 1 failed");
console.assert(shortestPalindromeKMP("abcd") === "dcbabcd", "Test 2 failed");
