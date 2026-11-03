/**
 * Problem: Valid Palindrome (LeetCode 125)
 * Difficulty: Easy
 * Pattern: TP1 - Opposite-direction pointers
 *
 * Check if alphanumeric characters in s read same forward and backward.
 */

// --- Optimal Approach (Two Pointers Colliding from Extremes) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function isPalindrome(s: string): boolean {
  let l = 0, r = s.length - 1;

  const isAlphaNum = (ch: string) => /[a-zA-Z0-9]/.test(ch);

  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++;
    while (l < r && !isAlphaNum(s[r])) r--;

    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++;
    r--;
  }

  return true;
}

// --- Test Verification ---
console.assert(isPalindrome("A man, a plan, a canal: Panama") === true, "Test 1 failed");
console.assert(isPalindrome("race a car") === false, "Test 2 failed");
