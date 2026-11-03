/**
 * Problem: Valid Anagram (LeetCode 242)
 * Difficulty: Easy
 * Pattern: S1 - Character frequency counting
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 */

// --- 1. Brute Force Approach (Sort and Compare) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function isAnagramSort(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
}

// --- 2. Optimal Approach (Fixed Array / Frequency Counter) ---
// Time Complexity: O(n) - single pass over s and t
// Space Complexity: O(1) - fixed 26 lowercase alphabet counters
export function isAnagramOptimal(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const count = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - aCode]++;
    count[t.charCodeAt(i) - aCode]--;
  }

  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) return false;
  }

  return true;
}

// --- Test Verification ---
console.assert(isAnagramOptimal("anagram", "nagaram") === true, "Test 1 failed");
console.assert(isAnagramOptimal("rat", "car") === false, "Test 2 failed");
