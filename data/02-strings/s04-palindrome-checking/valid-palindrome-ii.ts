/**
 * Problem: Valid Palindrome II (LeetCode 680)
 * Difficulty: Easy
 * Pattern: S4 - Palindrome checking
 *
 * Given a string s, return true if the s can be palindrome after deleting at most one character from it.
 */

// --- Optimal Approach (Greedy Two Pointers with 1 Tolerance Branch) ---
// Time Complexity: O(n) - at most 2 linear checks
// Space Complexity: O(1)
export function validPalindromeII(s: string): boolean {
  function isSubPalindrome(left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      // Branch: either delete s[left] or s[right]
      return isSubPalindrome(left + 1, right) || isSubPalindrome(left, right - 1);
    }
    left++;
    right--;
  }

  return true;
}

// --- Test Verification ---
console.assert(validPalindromeII("aba") === true, "Test 1 failed");
console.assert(validPalindromeII("abca") === true, "Test 2 failed");
console.assert(validPalindromeII("abc") === false, "Test 3 failed");
