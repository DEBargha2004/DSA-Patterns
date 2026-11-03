/**
 * Problem: Longest Palindrome (LeetCode 409)
 * Difficulty: Easy
 * Pattern: S4 - Palindrome checking
 *
 * Given a string s which consists of lowercase or uppercase letters,
 * return the length of the longest palindrome that can be built with those letters.
 */

// --- Optimal Approach (Greedy Character Frequency Matching) ---
// Time Complexity: O(n)
// Space Complexity: O(1) - at most 52 character counts
// Any character with even count can be fully included.
// Odd counts can contribute (count - 1), with at most one central odd character allowed (+1).
export function longestPalindrome(s: string): number {
  const counts = new Map<string, number>();
  for (const ch of s) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  let length = 0;
  let hasOdd = false;

  for (const count of counts.values()) {
    if (count % 2 === 0) {
      length += count;
    } else {
      length += count - 1;
      hasOdd = true;
    }
  }

  return hasOdd ? length + 1 : length;
}

// --- Test Verification ---
console.assert(longestPalindrome("abccccdd") === 7, "Test 1 failed");
console.assert(longestPalindrome("a") === 1, "Test 2 failed");
