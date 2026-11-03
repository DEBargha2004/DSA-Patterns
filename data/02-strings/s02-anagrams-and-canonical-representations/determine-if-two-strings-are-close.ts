/**
 * Problem: Determine if Two Strings Are Close (LeetCode 1657)
 * Difficulty: Medium
 * Pattern: S2 - Anagrams and canonical representations
 *
 * Two strings are close if you can attain one from the other using two operations:
 * Operation 1: Swap any two existing characters.
 * Operation 2: Transform every occurrence of one existing character into another existing character, and vice versa.
 */

// --- Optimal Approach (Canonical Frequency Multiset & Alphabet Match) ---
// Time Complexity: O(n)
// Space Complexity: O(1) - fixed 26 alphabet size
// Conditions for closeness:
// 1. Same length
// 2. Exactly the same set of unique characters
// 3. Exactly the same multiset of character frequencies
export function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const count1 = new Array<number>(26).fill(0);
  const count2 = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < word1.length; i++) {
    count1[word1.charCodeAt(i) - aCode]++;
    count2[word2.charCodeAt(i) - aCode]++;
  }

  // Check condition 2: same unique character presence
  for (let i = 0; i < 26; i++) {
    if ((count1[i] === 0 && count2[i] > 0) || (count1[i] > 0 && count2[i] === 0)) {
      return false;
    }
  }

  // Check condition 3: sorted frequency multisets match
  count1.sort((a, b) => a - b);
  count2.sort((a, b) => a - b);

  for (let i = 0; i < 26; i++) {
    if (count1[i] !== count2[i]) return false;
  }

  return true;
}

// --- Test Verification ---
console.assert(closeStrings("abc", "bca") === true, "Test 1 failed");
console.assert(closeStrings("a", "aa") === false, "Test 2 failed");
console.assert(closeStrings("cabbba", "abbccc") === true, "Test 3 failed");
