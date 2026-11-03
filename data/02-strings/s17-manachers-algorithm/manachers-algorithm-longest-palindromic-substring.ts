/**
 * Problem: Manacher's Algorithm - Longest Palindromic Substring (LeetCode 5)
 * Difficulty: Hard
 * Pattern: S17 - Manacher's algorithm
 *
 * Find the longest palindromic substring in strictly linear O(n) time.
 */

// --- Optimal Approach (Manacher's Linear Algorithm) ---
// Time Complexity: O(n) - centers advance monotonically
// Space Complexity: O(n)
export function longestPalindromeManacher(s: string): string {
  if (s.length <= 1) return s;

  // Transform string with boundary delimiters: "^#a#b#a#$"
  let t = "^";
  for (const ch of s) t += "#" + ch;
  t += "#$";

  const n = t.length;
  const p = new Array<number>(n).fill(0);
  let c = 0; // current center
  let r = 0; // right boundary of current palindrome

  let maxLen = 0;
  let centerIndex = 0;

  for (let i = 1; i < n - 1; i++) {
    const iMirror = 2 * c - i;

    if (r > i) {
      p[i] = Math.min(r - i, p[iMirror]);
    }

    // Expand palindrome centered at i
    while (t[i + 1 + p[i]] === t[i - 1 - p[i]]) {
      p[i]++;
    }

    // Update center and right boundary if palindrome exceeds r
    if (i + p[i] > r) {
      c = i;
      r = i + p[i];
    }

    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }

  const start = Math.floor((centerIndex - maxLen) / 2);
  return s.substring(start, start + maxLen);
}

// --- Test Verification ---
const pal = longestPalindromeManacher("babad");
console.assert(pal === "bab" || pal === "aba", "Test 1 failed");
console.assert(longestPalindromeManacher("cbbd") === "bb", "Test 2 failed");
