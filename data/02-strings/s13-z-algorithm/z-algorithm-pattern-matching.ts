/**
 * Problem: Z-Algorithm for Pattern Matching
 * Difficulty: Medium
 * Pattern: S13 - Z-algorithm
 *
 * The Z-array for string S is an array where Z[i] is the length of the longest substring starting from S[i]
 * that is also a prefix of S.
 */

// --- 1. Compute Z-Array in Linear Time ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function computeZArray(s: string): number[] {
  const n = s.length;
  const z = new Array<number>(n).fill(0);
  let l = 0;
  let r = 0;

  for (let i = 1; i < n; i++) {
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }

  return z;
}

// --- 2. Pattern Matching via Z-Algorithm ---
// Time Complexity: O(text + pattern)
// Space Complexity: O(text + pattern)
export function zSearch(text: string, pattern: string): number[] {
  const concat = pattern + '$' + text;
  const z = computeZArray(concat);
  const pLen = pattern.length;
  const matches: number[] = [];

  for (let i = pLen + 1; i < concat.length; i++) {
    if (z[i] === pLen) {
      matches.push(i - (pLen + 1));
    }
  }

  return matches;
}

// --- Test Verification ---
const matches = zSearch("baabaa", "aab");
console.assert(JSON.stringify(matches) === JSON.stringify([1]), "Test failed");
