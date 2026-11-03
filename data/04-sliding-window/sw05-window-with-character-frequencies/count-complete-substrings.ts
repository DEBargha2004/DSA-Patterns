/**
 * Problem: Count Complete Substrings (LeetCode 2953)
 * Difficulty: Hard
 * Pattern: SW5 - Window with character frequencies
 *
 * Substring where each character appears exactly k times, and adjacent chars diff <= 2.
 */

// --- Optimal Approach (Segment by Adjacent Diff <= 2 + Fixed Window Sizes u * k) ---
// Time Complexity: O(26 * n) = O(n)
// Space Complexity: O(1)
export function countCompleteSubstrings(word: string, k: number): number {
  let ans = 0;
  const n = word.length;

  function countInSegment(seg: string): number {
    let res = 0;
    // Window length can be u * k for u in 1..26 unique characters
    for (let u = 1; u <= 26 && u * k <= seg.length; u++) {
      const len = u * k;
      const count = new Array<number>(26).fill(0);
      const a = 'a'.charCodeAt(0);

      for (let i = 0; i < len; i++) {
        count[seg.charCodeAt(i) - a]++;
      }

      const isValid = () => count.every((c) => c === 0 || c === k);
      if (isValid()) res++;

      for (let i = len; i < seg.length; i++) {
        count[seg.charCodeAt(i) - a]++;
        count[seg.charCodeAt(i - len) - a]--;
        if (isValid()) res++;
      }
    }
    return res;
  }

  let start = 0;
  for (let i = 1; i <= n; i++) {
    if (i === n || Math.abs(word.charCodeAt(i) - word.charCodeAt(i - 1)) > 2) {
      ans += countInSegment(word.substring(start, i));
      start = i;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(countCompleteSubstrings("igigee", 2) === 3, "Test 1 failed");
console.assert(countCompleteSubstrings("aaabbbccc", 3) === 6, "Test 2 failed");
