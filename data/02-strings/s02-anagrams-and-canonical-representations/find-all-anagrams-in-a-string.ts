/**
 * Problem: Find All Anagrams in a String (LeetCode 438)
 * Difficulty: Medium
 * Pattern: S2 - Anagrams and canonical representations
 *
 * Given two strings s and p, return an array of all the start indices of p's anagrams in s.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O((s.length - p.length + 1) * p.length log p.length)
// Space Complexity: O(p.length)
export function findAnagramsBruteForce(s: string, p: string): number[] {
  const pSorted = p.split('').sort().join('');
  const k = p.length;
  const result: number[] = [];

  for (let i = 0; i <= s.length - k; i++) {
    const sub = s.slice(i, i + k).split('').sort().join('');
    if (sub === pSorted) result.push(i);
  }

  return result;
}

// --- 2. Optimal Approach (Sliding Window with 26-element Frequency Vector) ---
// Time Complexity: O(s.length)
// Space Complexity: O(1) - fixed 26-size arrays
export function findAnagramsOptimal(s: string, p: string): number[] {
  const result: number[] = [];
  if (s.length < p.length) return result;

  const pCount = new Array<number>(26).fill(0);
  const sCount = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);
  const k = p.length;

  for (let i = 0; i < k; i++) {
    pCount[p.charCodeAt(i) - aCode]++;
    sCount[s.charCodeAt(i) - aCode]++;
  }

  function matches(): boolean {
    for (let i = 0; i < 26; i++) {
      if (pCount[i] !== sCount[i]) return false;
    }
    return true;
  }

  if (matches()) result.push(0);

  for (let i = k; i < s.length; i++) {
    sCount[s.charCodeAt(i) - aCode]++;
    sCount[s.charCodeAt(i - k) - aCode]--;

    if (matches()) {
      result.push(i - k + 1);
    }
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(findAnagramsOptimal("cbaebabacd", "abc")) === JSON.stringify([0, 6]), "Test failed");
