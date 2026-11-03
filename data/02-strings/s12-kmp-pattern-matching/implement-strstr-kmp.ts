/**
 * Problem: Implement strStr using KMP (LeetCode 28)
 * Difficulty: Medium
 * Pattern: S12 - KMP pattern matching
 *
 * Find first occurrence of pattern in text using Knuth-Morris-Pratt (KMP) linear-time algorithm.
 */

// --- 1. Compute LPS (Longest Prefix Suffix) Array ---
// Time Complexity: O(m)
// Space Complexity: O(m)
export function computeLPSArray(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0; // length of previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

// --- 2. KMP Search ---
// Time Complexity: O(n + m) - guaranteed linear worst-case
// Space Complexity: O(m)
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (text.length < pattern.length) return -1;

  const lps = computeLPSArray(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      return i - j; // Match found
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1]; // Fall back without resetting i
      } else {
        i++;
      }
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(kmpSearch("sadbutsad", "sad") === 0, "Test 1 failed");
console.assert(kmpSearch("leetcode", "code") === 4, "Test 2 failed");
console.assert(kmpSearch("hello", "ll") === 2, "Test 3 failed");
