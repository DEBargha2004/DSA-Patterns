/**
 * Pattern: Word search / Partitioning
 * Problem: Word Break II (LeetCode 140)
 *
 * Given a string s and a dictionary of strings wordDict, add spaces in s to construct
 * a sentence where each word is a valid dictionary word. Return all such possible sentences.
 */

// Brute Force: Pure recursion without memoization
// Time: O(2^N * N), Space: O(N)
export function wordBreakBrute(s: string, wordDict: string[]): string[] {
  const dict = new Set(wordDict);
  const result: string[] = [];
  const path: string[] = [];

  function backtrack(start: number): void {
    if (start === s.length) {
      result.push(path.join(" "));
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const prefix = s.slice(start, end);
      if (dict.has(prefix)) {
        path.push(prefix);
        backtrack(end);
        path.pop();
      }
    }
  }

  backtrack(0);
  return result;
}

// Optimal: Memoized DFS (Top-Down Dynamic Programming)
// Time: O(N^2 + Total Substrings), Space: O(N * 2^N)
export function wordBreakOptimal(s: string, wordDict: string[]): string[] {
  const dict = new Set(wordDict);
  const memo = new Map<string, string[]>();

  function dfs(str: string): string[] {
    if (memo.has(str)) return memo.get(str)!;
    if (str.length === 0) return [""];

    const sentences: string[] = [];
    for (const word of dict) {
      if (str.startsWith(word)) {
        const remainder = str.slice(word.length);
        const subSentences = dfs(remainder);
        for (const sub of subSentences) {
          sentences.push(sub.length === 0 ? word : word + " " + sub);
        }
      }
    }

    memo.set(str, sentences);
    return sentences;
  }

  return dfs(s);
}

// Test cases
const sWB = "catsanddog";
const dictWB = ["cat", "cats", "and", "sand", "dog"];
const wb1 = wordBreakBrute(sWB, dictWB).sort();
const wb2 = wordBreakOptimal(sWB, dictWB).sort();
if (JSON.stringify(wb1) !== JSON.stringify(wb2) || wb2.length !== 2) {
  throw new Error("Mismatch in Word Break II");
}
console.log("Word Break II passed!");
