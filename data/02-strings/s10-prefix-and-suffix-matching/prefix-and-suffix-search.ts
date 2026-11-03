/**
 * Problem: Prefix and Suffix Search (LeetCode 745)
 * Difficulty: Hard
 * Pattern: S10 - Prefix and suffix matching
 *
 * Design a special dictionary with some words that searchs the words in it by a prefix and a suffix.
 * Return the index of the word in the dictionary with the highest index having the given prefix and suffix.
 */

// --- Optimal Approach (Trie / Hash Map with Suffix-Prefix Combinations) ---
// Time Complexity: O(N * L^2) precomputation, O(P + S) per query
// Space Complexity: O(N * L^2)
export class WordFilter {
  private prefixSuffixMap: Map<string, number>;

  constructor(words: string[]) {
    this.prefixSuffixMap = new Map<string, number>();

    for (let weight = 0; weight < words.length; weight++) {
      const word = words[weight];
      const len = word.length;

      for (let p = 0; p <= len; p++) {
        const prefix = word.substring(0, p);
        for (let s = 0; s <= len; s++) {
          const suffix = word.substring(len - s);
          this.prefixSuffixMap.set(`${prefix}#${suffix}`, weight);
        }
      }
    }
  }

  f(pref: string, suff: string): number {
    return this.prefixSuffixMap.get(`${pref}#${suff}`) ?? -1;
  }
}

// --- Test Verification ---
const wf = new WordFilter(["apple"]);
console.assert(wf.f("a", "e") === 0, "Test 1 failed");
console.assert(wf.f("b", "") === -1, "Test 2 failed");
