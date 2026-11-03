/**
 * Problem: Number of Matching Subsequences (LeetCode 792)
 * Difficulty: Medium
 * Pattern: S15 - Subsequence matching
 *
 * Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.
 */

// --- Optimal Approach (Bucket Processing by Waiting Character) ---
// Time Complexity: O(s.length + total length of all words)
// Space Complexity: O(words.length)
export function numMatchingSubseq(s: string, words: string[]): number {
  // Heads map: char -> array of [wordIndex, charIndex]
  const heads = new Map<string, [number, number][]>();
  for (let c = 97; c <= 122; c++) heads.set(String.fromCharCode(c), []);

  for (let i = 0; i < words.length; i++) {
    const firstChar = words[i][0];
    heads.get(firstChar)!.push([i, 0]);
  }

  let matchCount = 0;

  for (const ch of s) {
    const currentBucket = heads.get(ch)!;
    heads.set(ch, []); // Reset bucket for this character

    for (const [wIdx, cIdx] of currentBucket) {
      if (cIdx + 1 === words[wIdx].length) {
        matchCount++;
      } else {
        const nextChar = words[wIdx][cIdx + 1];
        heads.get(nextChar)!.push([wIdx, cIdx + 1]);
      }
    }
  }

  return matchCount;
}

// --- Test Verification ---
console.assert(numMatchingSubseq("abcde", ["a", "bb", "acd", "ace"]) === 3, "Test failed");
