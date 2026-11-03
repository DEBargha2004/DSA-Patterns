/**
 * Problem: Word Ladder (LeetCode 127)
 * Difficulty: Hard
 * Pattern: SQ7 - Queue-based BFS
 *
 * Find shortest transformation sequence length from beginWord to endWord.
 */

// --- Optimal Approach (BFS with Set for Fast Lookups) ---
// Time Complexity: O(n * L^2 * 26) where n is wordList size, L is word length
// Space Complexity: O(n * L)
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue: [word: string, steps: number][] = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);

  while (queue.length > 0) {
    const [word, steps] = queue.shift()!;

    if (word === endWord) {
      return steps;
    }

    const chars = word.split("");
    for (let i = 0; i < chars.length; i++) {
      const origChar = chars[i];
      for (let c = 97; c <= 122; c++) {
        const nextChar = String.fromCharCode(c);
        if (nextChar === origChar) continue;

        chars[i] = nextChar;
        const nextWord = chars.join("");
        if (wordSet.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, steps + 1]);
        }
      }
      chars[i] = origChar;
    }
  }

  return 0;
}

// --- Test Verification ---
console.assert(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]) === 5, "Test 1 failed");
console.assert(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]) === 0, "Test 2 failed");
