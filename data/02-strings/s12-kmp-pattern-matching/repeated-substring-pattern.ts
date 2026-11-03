/**
 * Problem: Repeated Substring Pattern (LeetCode 459)
 * Difficulty: Easy
 * Pattern: S12 - KMP pattern matching (LPS Property)
 *
 * Given a string s, check if it can be constructed by taking a substring of it
 * and appending multiple copies of the substring together.
 */

// --- 1. Doubling Trick Approach ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function repeatedSubstringPatternDoubling(s: string): boolean {
  return (s + s).slice(1, -1).includes(s);
}

// --- 2. Optimal Approach (KMP LPS Periodicity Theorem) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
// Property: If s is periodic, the repeating unit length is k = n - lps[n-1].
// Condition: lps[n-1] > 0 and n % (n - lps[n-1]) === 0.
export function repeatedSubstringPatternKMP(s: string): boolean {
  const n = s.length;
  const lps = new Array<number>(n).fill(0);
  let len = 0;
  let i = 1;

  while (i < n) {
    if (s[i] === s[len]) {
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

  const longestPrefixSuffix = lps[n - 1];
  return longestPrefixSuffix > 0 && n % (n - longestPrefixSuffix) === 0;
}

// --- Test Verification ---
console.assert(repeatedSubstringPatternKMP("abab") === true, "Test 1 failed");
console.assert(repeatedSubstringPatternKMP("aba") === false, "Test 2 failed");
console.assert(repeatedSubstringPatternKMP("abcabcabcabc") === true, "Test 3 failed");
