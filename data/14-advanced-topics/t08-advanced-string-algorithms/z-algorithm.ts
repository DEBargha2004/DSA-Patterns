/**
 * Pattern: Advanced string algorithms
 * Problem: Z-Algorithm for Pattern Matching
 *
 * Compute Z-array where Z[i] is the length of the longest substring starting from s[i]
 * that is also a prefix of s.
 */

// Brute Force: Linear prefix comparison for each index
// Time: O(N^2), Space: O(N)
export function computeZBrute(s: string): number[] {
  const n = s.length;
  const z = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
  }
  return z;
}

// Optimal: Z-Algorithm with Z-Box [L, R]
// Time: O(N), Space: O(N)
export function computeZOptimal(s: string): number[] {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;

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

export function searchPatternZ(text: string, pattern: string): number[] {
  const concat = pattern + "$" + text;
  const z = computeZOptimal(concat);
  const matches: number[] = [];
  const pLen = pattern.length;

  for (let i = pLen + 1; i < concat.length; i++) {
    if (z[i] === pLen) {
      matches.push(i - pLen - 1);
    }
  }

  return matches;
}

// Test cases
const z1 = computeZBrute("aabzaa");
const z2 = computeZOptimal("aabzaa");
if (JSON.stringify(z1) !== JSON.stringify(z2)) throw new Error("Z-array mismatch");
const mZ = searchPatternZ("baabaa", "aab");
if (mZ.length !== 1 || mZ[0] !== 1) throw new Error("Expected match at index 1");
console.log("Z-Algorithm passed!");
