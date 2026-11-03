/**
 * Problem: First Unique Character in a String (LeetCode 387)
 * Difficulty: Easy
 * Pattern: A3 - Frequency counting
 *
 * Given a string s, find the first non-repeating character and return its index. If none, return -1.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - for each char, search if it appears elsewhere
// Space Complexity: O(1)
export function firstUniqCharBruteForce(s: string): number {
  for (let i = 0; i < s.length; i++) {
    let isUnique = true;
    for (let j = 0; j < s.length; j++) {
      if (i !== j && s[i] === s[j]) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) return i;
  }
  return -1;
}

// --- 2. Optimal Approach (Array / Map Frequency Counter - Two Pass) ---
// Time Complexity: O(n) - pass 1 counts, pass 2 finds first index with count === 1
// Space Complexity: O(1) - alphabet size <= 26
export function firstUniqCharOptimal(s: string): number {
  const counts = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - aCode]++;
  }

  for (let i = 0; i < s.length; i++) {
    if (counts[s.charCodeAt(i) - aCode] === 1) {
      return i;
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(firstUniqCharOptimal("leetcode") === 0, "Test 1 failed");
console.assert(firstUniqCharOptimal("loveleetcode") === 2, "Test 2 failed");
console.assert(firstUniqCharOptimal("aabb") === -1, "Test 3 failed");
