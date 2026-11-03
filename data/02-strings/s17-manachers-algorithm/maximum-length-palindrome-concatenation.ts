/**
 * Problem: Longest Palindrome by Concatenating Two Letter Words (LeetCode 2131)
 * Difficulty: Medium
 * Pattern: S17 - Palindromic string matching
 *
 * You are given an array of strings words. Each element consists of two lowercase English letters.
 * Return the length of the longest palindrome that you can obtain by concatenating elements from words.
 */

// --- Optimal Approach (Greedy Pair Matching Map) ---
// Time Complexity: O(n)
// Space Complexity: O(total unique pairs) <= O(26^2) = O(1)
export function longestPalindromeFromWords(words: string[]): number {
  const count = new Map<string, number>();
  for (const w of words) count.set(w, (count.get(w) ?? 0) + 1);

  let length = 0;
  let hasCentral = false;

  for (const [w, c] of count.entries()) {
    const rev = w[1] + w[0];
    if (w === rev) {
      // Same letter word (e.g. "gg")
      const pairs = Math.floor(c / 2);
      length += pairs * 4;
      if (c % 2 === 1) hasCentral = true;
    } else if (w < rev && count.has(rev)) {
      // Differing pairs (e.g. "lc" and "cl")
      const pairs = Math.min(c, count.get(rev)!);
      length += pairs * 4;
    }
  }

  return hasCentral ? length + 2 : length;
}

// --- Test Verification ---
console.assert(longestPalindromeFromWords(["lc", "cl", "gg"]) === 6, "Test 1 failed");
console.assert(longestPalindromeFromWords(["ab", "ty", "yt", "lc", "cl", "ab"]) === 8, "Test 2 failed");
