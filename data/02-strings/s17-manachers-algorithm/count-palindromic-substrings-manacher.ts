/**
 * Problem: Palindromic Substrings via Manacher's Algorithm (LeetCode 647)
 * Difficulty: Medium
 * Pattern: S17 - Manacher's algorithm
 *
 * Given a string s, return the number of palindromic substrings in it in strictly O(n) time.
 */

// --- Optimal Approach (Manacher's Count: sum of ceil(p[i] / 2)) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function countSubstringsManacher(s: string): number {
  if (s.length === 0) return 0;

  let t = "^";
  for (const ch of s) t += "#" + ch;
  t += "#$";

  const n = t.length;
  const p = new Array<number>(n).fill(0);
  let c = 0;
  let r = 0;
  let totalCount = 0;

  for (let i = 1; i < n - 1; i++) {
    const iMirror = 2 * c - i;
    if (r > i) p[i] = Math.min(r - i, p[iMirror]);

    while (t[i + 1 + p[i]] === t[i - 1 - p[i]]) p[i]++;

    if (i + p[i] > r) {
      c = i;
      r = i + p[i];
    }

    totalCount += Math.floor((p[i] + 1) / 2);
  }

  return totalCount;
}

// --- Test Verification ---
console.assert(countSubstringsManacher("abc") === 3, "Test 1 failed");
console.assert(countSubstringsManacher("aaa") === 6, "Test 2 failed");
