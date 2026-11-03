/**
 * Pattern: Advanced string algorithms
 * Problem: Knuth-Morris-Pratt (KMP) String Matching Algorithm
 */

// Brute Force: Naive substring matching
// Time: O(N * M), Space: O(1)
export function strStrBrute(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }
  return -1;
}

// Optimal: KMP with Longest Prefix Suffix (LPS / Pi table)
// Time: O(N + M), Space: O(M)
export function strStrKMP(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  const m = needle.length;
  const lps = new Array(m).fill(0);

  // Precompute LPS
  let len = 0;
  let i = 1;
  while (i < m) {
    if (needle[i] === needle[len]) {
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

  // Search pattern
  let h = 0, n = 0;
  while (h < haystack.length) {
    if (haystack[h] === needle[n]) {
      h++;
      n++;
      if (n === m) return h - m;
    } else {
      if (n !== 0) {
        n = lps[n - 1];
      } else {
        h++;
      }
    }
  }

  return -1;
}

// Test cases
if (strStrBrute("sadbutsad", "sad") !== 0 || strStrKMP("sadbutsad", "sad") !== 0) throw new Error("Expected 0");
if (strStrKMP("leetcode", "leeto") !== -1) throw new Error("Expected -1");
console.log("KMP Pattern Matching passed!");
