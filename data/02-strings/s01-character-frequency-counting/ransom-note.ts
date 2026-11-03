/**
 * Problem: Ransom Note (LeetCode 383)
 * Difficulty: Easy
 * Pattern: S1 - Character frequency counting
 *
 * Given two strings ransomNote and magazine, return true if ransomNote can be constructed
 * by using the letters from magazine and false otherwise.
 */

// --- 1. Brute Force Approach (Letter Replacement Simulation) ---
// Time Complexity: O(n * m)
// Space Complexity: O(m)
export function canConstructBruteForce(ransomNote: string, magazine: string): boolean {
  let magArr = magazine.split('');
  for (const ch of ransomNote) {
    const idx = magArr.indexOf(ch);
    if (idx === -1) return false;
    magArr.splice(idx, 1);
  }
  return true;
}

// --- 2. Optimal Approach (Frequency Counting Array) ---
// Time Complexity: O(n + m)
// Space Complexity: O(1) - fixed 26 letter counts
export function canConstructOptimal(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > magazine.length) return false;

  const counts = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < magazine.length; i++) {
    counts[magazine.charCodeAt(i) - aCode]++;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const idx = ransomNote.charCodeAt(i) - aCode;
    counts[idx]--;
    if (counts[idx] < 0) return false;
  }

  return true;
}

// --- Test Verification ---
console.assert(canConstructOptimal("a", "b") === false, "Test 1 failed");
console.assert(canConstructOptimal("aa", "ab") === false, "Test 2 failed");
console.assert(canConstructOptimal("aa", "aab") === true, "Test 3 failed");
