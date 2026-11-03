/**
 * Problem: Expressive Words (LeetCode 809)
 * Difficulty: Medium
 * Pattern: TP10 - Multiple pointers across sequences
 *
 * Check how many words can be stretched to become s.
 */

// --- Optimal Approach (Two Pointers Comparing Group Lengths) ---
// Time Complexity: O(words.length * s.length)
// Space Complexity: O(1)
export function expressiveWords(s: string, words: string[]): number {
  function check(word: string): boolean {
    let i = 0, j = 0;
    while (i < s.length && j < word.length) {
      if (s[i] !== word[j]) return false;

      let lenS = 0;
      const ch = s[i];
      while (i < s.length && s[i] === ch) { lenS++; i++; }

      let lenW = 0;
      while (j < word.length && word[j] === ch) { lenW++; j++; }

      if (lenS < lenW) return false;
      if (lenS !== lenW && lenS < 3) return false;
    }

    return i === s.length && j === word.length;
  }

  return words.filter(check).length;
}

// --- Test Verification ---
console.assert(expressiveWords("heeellooo", ["hello", "hi", "helo"]) === 1, "Test failed");
