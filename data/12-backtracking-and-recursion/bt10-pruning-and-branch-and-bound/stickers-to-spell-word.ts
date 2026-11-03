/**
 * Pattern: Pruning and branch-and-bound
 * Problem: Stickers to Spell Word (LeetCode 691)
 *
 * Given n different types of stickers (each sticker has a lowercase English word on it),
 * return the minimum number of stickers you need to spell out target. If impossible, return -1.
 */

// Brute Force: Recursively try all stickers without memoization
// Time: O(N^T), Space: O(T)
export function minStickersBrute(stickers: string[], target: string): number {
  function removeLetters(s: string, sticker: string): string {
    const counts = new Map<string, number>();
    for (const ch of sticker) counts.set(ch, (counts.get(ch) || 0) + 1);
    const result: string[] = [];
    for (const ch of s) {
      if ((counts.get(ch) || 0) > 0) {
        counts.set(ch, counts.get(ch)! - 1);
      } else {
        result.push(ch);
      }
    }
    return result.join("");
  }

  function dfs(rem: string, depth: number): number {
    if (rem.length === 0) return depth;
    if (depth > target.length) return Infinity;

    let minAns = Infinity;
    for (const sticker of stickers) {
      if (!sticker.includes(rem[0])) continue; // Prune: only choose stickers that cover the first missing character
      const next = removeLetters(rem, sticker);
      minAns = Math.min(minAns, dfs(next, depth + 1));
    }
    return minAns;
  }

  const ans = dfs(target, 0);
  return ans === Infinity ? -1 : ans;
}

// Optimal: Memoized Branch-and-Bound with Character Frequency Bit/String State Pruning
// Time: O(2^T * N * T), Space: O(2^T)
export function minStickersOptimal(stickers: string[], target: string): number {
  const n = stickers.length;
  const stickerCounts: number[][] = Array.from({ length: n }, () => new Array(26).fill(0));
  for (let i = 0; i < n; i++) {
    for (const ch of stickers[i]) {
      stickerCounts[i][ch.charCodeAt(0) - 97]++;
    }
  }

  const memo = new Map<string, number>();
  memo.set("", 0);

  function dfs(rem: string): number {
    if (memo.has(rem)) return memo.get(rem)!;

    const targetCharCounts = new Array(26).fill(0);
    for (const ch of rem) targetCharCounts[ch.charCodeAt(0) - 97]++;

    let minCount = Infinity;

    // Pruning invariant: Pick sticker that contains the first character of `rem`
    const firstCharIdx = rem.charCodeAt(0) - 97;

    for (let i = 0; i < n; i++) {
      if (stickerCounts[i][firstCharIdx] === 0) continue; // Prune

      let nextRem = "";
      for (let c = 0; c < 26; c++) {
        if (targetCharCounts[c] > 0) {
          const remainingForChar = Math.max(0, targetCharCounts[c] - stickerCounts[i][c]);
          nextRem += String.fromCharCode(97 + c).repeat(remainingForChar);
        }
      }

      const res = dfs(nextRem);
      if (res !== -1) {
        minCount = Math.min(minCount, 1 + res);
      }
    }

    const finalAns = minCount === Infinity ? -1 : minCount;
    memo.set(rem, finalAns);
    return finalAns;
  }

  return dfs(target);
}

// Test cases
const rStick1 = minStickersBrute(["with", "example", "science"], "thehat");
const rStick2 = minStickersOptimal(["with", "example", "science"], "thehat");
if (rStick1 !== 3 || rStick2 !== 3) throw new Error("Expected 3 stickers for 'thehat'");
console.log("Stickers to Spell Word passed!");
