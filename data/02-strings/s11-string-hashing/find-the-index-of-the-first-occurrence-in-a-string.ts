/**
 * Problem: Find the Index of the First Occurrence in a String (LeetCode 28)
 * Difficulty: Medium
 * Pattern: S11 - String hashing (Rabin-Karp Algorithm)
 *
 * Given two strings needle and haystack, return the index of the first occurrence of needle in haystack,
 * or -1 if needle is not part of haystack.
 */

// --- Optimal Approach (Rabin-Karp Rolling Hash) ---
// Time Complexity: O(N + M) average, O(N * M) worst-case (spurious hits handled)
// Space Complexity: O(1)
export function strStrRabinKarp(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;
  if (m === 0) return 0;
  if (n < m) return -1;

  const BASE = 256;
  const MOD = 1000000007;

  let needleHash = 0;
  let hayHash = 0;
  let power = 1;

  // Precompute BASE^(m-1) % MOD
  for (let i = 0; i < m - 1; i++) {
    power = (power * BASE) % MOD;
  }

  // Initial window hash
  for (let i = 0; i < m; i++) {
    needleHash = (needleHash * BASE + needle.charCodeAt(i)) % MOD;
    hayHash = (hayHash * BASE + haystack.charCodeAt(i)) % MOD;
  }

  for (let i = 0; i <= n - m; i++) {
    if (needleHash === hayHash) {
      // Verify characters to avoid collision error
      if (haystack.substring(i, i + m) === needle) {
        return i;
      }
    }

    if (i < n - m) {
      // Roll the hash: remove haystack[i], add haystack[i + m]
      hayHash = (BASE * (hayHash - haystack.charCodeAt(i) * power) + haystack.charCodeAt(i + m)) % MOD;
      if (hayHash < 0) hayHash += MOD;
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(strStrRabinKarp("sadbutsad", "sad") === 0, "Test 1 failed");
console.assert(strStrRabinKarp("leetcode", "leeto") === -1, "Test 2 failed");
