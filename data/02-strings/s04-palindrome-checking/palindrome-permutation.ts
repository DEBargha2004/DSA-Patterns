/**
 * Problem: Palindrome Permutation (LeetCode 266)
 * Difficulty: Easy
 * Pattern: S4 - Palindrome checking
 *
 * Given a string s, return true if a permutation of the string could form a palindrome and false otherwise.
 */

// --- Optimal Approach (Odd Count Tracking) ---
// Time Complexity: O(n)
// Space Complexity: O(1) - at most 26/128 characters
// A string permutation can form a palindrome if and only if at most one character has an odd frequency.
export function canPermutePalindrome(s: string): boolean {
  const oddChars = new Set<string>();

  for (const ch of s) {
    if (oddChars.has(ch)) {
      oddChars.delete(ch);
    } else {
      oddChars.add(ch);
    }
  }

  return oddChars.size <= 1;
}

// --- Test Verification ---
console.assert(canPermutePalindrome("code") === false, "Test 1 failed");
console.assert(canPermutePalindrome("aab") === true, "Test 2 failed");
console.assert(canPermutePalindrome("carerac") === true, "Test 3 failed");
