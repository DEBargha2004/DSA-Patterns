/**
 * Problem: Reverse Only Letters (LeetCode 917)
 * Difficulty: Easy
 * Pattern: TP1 - Opposite-direction pointers
 *
 * Given a string s, reverse the string according to the following rules:
 * All non-English letters remain in the same position; English letters reverse positions.
 */

// --- Optimal Approach (Opposite Pointers Skipping Non-Letters) ---
// Time Complexity: O(n)
// Space Complexity: O(n) for array conversion
export function reverseOnlyLetters(s: string): string {
  const chars = s.split('');
  let l = 0, r = chars.length - 1;

  const isLetter = (c: string) => /[a-zA-Z]/.test(c);

  while (l < r) {
    while (l < r && !isLetter(chars[l])) l++;
    while (l < r && !isLetter(chars[r])) r--;

    if (l < r) {
      const temp = chars[l];
      chars[l] = chars[r];
      chars[r] = temp;
      l++;
      r--;
    }
  }

  return chars.join('');
}

// --- Test Verification ---
console.assert(reverseOnlyLetters("ab-cd") === "dc-ba", "Test 1 failed");
console.assert(reverseOnlyLetters("a-bC-dEf-ghIj") === "j-Ih-gfE-dCba", "Test 2 failed");
