/**
 * Problem: Longest Word in Dictionary through Deleting (LeetCode 524)
 * Difficulty: Medium
 * Pattern: S15 - Subsequence matching
 *
 * Given a string s and a string array dictionary, return the longest string in the dictionary
 * that can be formed by deleting some characters of the given string.
 * If multiple results, return the smallest lexicographical result.
 */

// --- Optimal Approach (Sort by Length Descending + Subsequence Check) ---
// Time Complexity: O(k * n log k) where k is dictionary size, n is average word length
// Space Complexity: O(log k)
export function findLongestWord(s: string, dictionary: string[]): string {
  dictionary.sort((a, b) => {
    if (a.length !== b.length) return b.length - a.length;
    return a.localeCompare(b);
  });

  function isSubseq(word: string): boolean {
    let i = 0, j = 0;
    while (i < s.length && j < word.length) {
      if (s[i] === word[j]) j++;
      i++;
    }
    return j === word.length;
  }

  for (const word of dictionary) {
    if (isSubseq(word)) return word;
  }

  return "";
}

// --- Test Verification ---
console.assert(findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"]) === "apple", "Test 1 failed");
console.assert(findLongestWord("abpcplea", ["a", "b", "c"]) === "a", "Test 2 failed");
