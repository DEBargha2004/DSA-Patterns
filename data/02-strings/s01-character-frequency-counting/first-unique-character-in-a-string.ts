/**
 * Problem: First Unique Character in a String (LeetCode 387)
 * Difficulty: Easy
 * Pattern: S1 - Character frequency counting
 *
 * Given a string s, find the first non-repeating character in it and return its index.
 * If it does not exist, return -1.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - check if s[i] exists at any other index
// Space Complexity: O(1)
export function firstUniqCharBruteForce(s: string): number {
  for (let i = 0; i < s.length; i++) {
    let unique = true;
    for (let j = 0; j < s.length; j++) {
      if (i !== j && s[i] === s[j]) {
        unique = false;
        break;
      }
    }
    if (unique) return i;
  }
  return -1;
}

// --- 2. Optimal Approach (Two-Pass Frequency Counting) ---
// Time Complexity: O(n) - pass 1 counts frequencies, pass 2 checks first with count === 1
// Space Complexity: O(1) - alphabet size 26
export function firstUniqCharOptimal(s: string): number {
  const count = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - aCode]++;
  }

  for (let i = 0; i < s.length; i++) {
    if (count[s.charCodeAt(i) - aCode] === 1) {
      return i;
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(firstUniqCharOptimal("leetcode") === 0, "Test 1 failed");
console.assert(firstUniqCharOptimal("loveleetcode") === 2, "Test 2 failed");
console.assert(firstUniqCharOptimal("aabb") === -1, "Test 3 failed");
