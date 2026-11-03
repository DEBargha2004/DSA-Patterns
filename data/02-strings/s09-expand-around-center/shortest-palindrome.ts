/**
 * Problem: Shortest Palindrome (LeetCode 214)
 * Difficulty: Hard
 * Pattern: S9 - Expand around center / Prefix palindrome
 *
 * You are given a string s. You can convert s to a palindrome by adding characters in front of it.
 * Return the shortest palindrome you can find by performing this transformation.
 */

// --- Optimal Approach (Two Pointers Prefix Search) ---
// Time Complexity: O(n^2) worst case, O(n) average
// Space Complexity: O(n)
// Finds the longest palindromic prefix of s, reverses remaining suffix and prepends it.
export function shortestPalindrome(s: string): string {
  const n = s.length;
  let i = 0;

  for (let j = n - 1; j >= 0; j--) {
    if (s[i] === s[j]) {
      i++;
    }
  }

  if (i === n) return s;

  const suffix = s.substring(i);
  const revSuffix = suffix.split('').reverse().join('');

  return revSuffix + shortestPalindrome(s.substring(0, i)) + suffix;
}

// --- Test Verification ---
console.assert(shortestPalindrome("aacecaaa") === "aaacecaaa", "Test 1 failed");
console.assert(shortestPalindrome("abcd") === "dcbabcd", "Test 2 failed");
