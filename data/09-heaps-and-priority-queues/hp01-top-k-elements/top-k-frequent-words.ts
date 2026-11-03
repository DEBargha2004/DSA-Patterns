/**
 * Problem: Top K Frequent Words (LeetCode 692)
 * Difficulty: Medium
 * Pattern: HP1 - Top K elements
 *
 * Return k most frequent words sorted by frequency descending, then lexicographically ascending.
 */

// --- Optimal Approach (Custom Frequency Sort / Min-Heap) ---
// Time Complexity: O(n log k)
// Space Complexity: O(n)
export function topKFrequentWords(words: string[], k: number): string[] {
  const count = new Map<string, number>();
  for (const w of words) count.set(w, (count.get(w) ?? 0) + 1);

  const uniqueWords = Array.from(count.keys());
  uniqueWords.sort((a, b) => {
    const diff = count.get(b)! - count.get(a)!;
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  return uniqueWords.slice(0, k);
}

// --- Test Verification ---
const w1 = ["i", "love", "leetcode", "i", "love", "coding"];
console.assert(JSON.stringify(topKFrequentWords(w1, 2)) === JSON.stringify(["i", "love"]), "Test 1 failed");
const w2 = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"];
console.assert(JSON.stringify(topKFrequentWords(w2, 4)) === JSON.stringify(["the", "is", "sunny", "day"]), "Test 2 failed");
