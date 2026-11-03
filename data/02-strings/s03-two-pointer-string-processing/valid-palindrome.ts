/**
 * Problem: Valid Palindrome (LeetCode 125)
 * Difficulty: Easy
 * Pattern: S3 - Two-pointer string processing
 *
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 */

// --- 1. Brute Force Approach (Filter & Reverse) ---
// Time Complexity: O(n)
// Space Complexity: O(n) - creates sanitized string copy
export function isPalindromeFilter(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// --- 2. Optimal Approach (Two Pointers In-Place from Ends) ---
// Time Complexity: O(n) - single pass, skips non-alphanumeric on the fly
// Space Complexity: O(1)
export function isPalindromeOptimal(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  function isAlphanumeric(code: number): boolean {
    return (
      (code >= 48 && code <= 57) || // 0-9
      (code >= 65 && code <= 90) || // A-Z
      (code >= 97 && code <= 122)   // a-z
    );
  }

  while (left < right) {
    while (left < right && !isAlphanumeric(s.charCodeAt(left))) left++;
    while (left < right && !isAlphanumeric(s.charCodeAt(right))) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// --- Test Verification ---
console.assert(isPalindromeOptimal("A man, a plan, a canal: Panama") === true, "Test 1 failed");
console.assert(isPalindromeOptimal("race a car") === false, "Test 2 failed");
