/**
 * Problem: Repeated DNA Sequences (LeetCode 187)
 * Difficulty: Medium
 * Pattern: S11 - String hashing
 *
 * Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings)
 * that occur more than once in a DNA molecule.
 */

// --- 1. Brute Force Approach (Substring Set) ---
// Time Complexity: O(N * L) where L = 10
// Space Complexity: O(N * L)
export function findRepeatedDnaSequencesSet(s: string): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();

  for (let i = 0; i <= s.length - 10; i++) {
    const sub = s.substring(i, i + 10);
    if (seen.has(sub)) {
      repeated.add(sub);
    } else {
      seen.add(sub);
    }
  }

  return Array.from(repeated);
}

// --- 2. Optimal Approach (Rolling Hash / Bitmask 2-bit Encoding) ---
// Time Complexity: O(N) - bitwise rolling update takes O(1) per step
// Space Complexity: O(N) storing integer hashes instead of strings
// A: 00, C: 01, G: 10, T: 11
export function findRepeatedDnaSequencesOptimal(s: string): string[] {
  if (s.length < 10) return [];

  const charMap: Record<string, number> = { A: 0, C: 1, G: 2, T: 3 };
  const seen = new Set<number>();
  const output = new Set<string>();

  let bitmask = 0;
  // Initialize first 9 characters
  for (let i = 0; i < 9; i++) {
    bitmask = (bitmask << 2) | charMap[s[i]];
  }

  const mask10 = (1 << 20) - 1; // 20 bits mask for 10 characters

  for (let i = 9; i < s.length; i++) {
    bitmask = ((bitmask << 2) | charMap[s[i]]) & mask10;
    if (seen.has(bitmask)) {
      output.add(s.substring(i - 9, i + 1));
    } else {
      seen.add(bitmask);
    }
  }

  return Array.from(output);
}

// --- Test Verification ---
const res = findRepeatedDnaSequencesOptimal("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT");
console.assert(res.includes("AAAAACCCCC") && res.includes("CCCCCAAAAA"), "Test failed");
