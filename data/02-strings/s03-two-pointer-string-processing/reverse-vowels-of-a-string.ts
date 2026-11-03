/**
 * Problem: Reverse Vowels of a String (LeetCode 345)
 * Difficulty: Easy
 * Pattern: S3 - Two-pointer string processing
 *
 * Given a string s, reverse only all the vowels in the string and return it.
 */

// --- Optimal Approach (Two Pointers Skipping Consonants) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(n) - string array conversion
export function reverseVowels(s: string): string {
  const chars = s.split('');
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    while (left < right && !vowels.has(chars[left])) left++;
    while (left < right && !vowels.has(chars[right])) right--;

    if (left < right) {
      const temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }
  }

  return chars.join('');
}

// --- Test Verification ---
console.assert(reverseVowels("hello") === "holle", "Test 1 failed");
console.assert(reverseVowels("leetcode") === "leotcede", "Test 2 failed");
