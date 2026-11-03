/**
 * Problem: Permutation in String (LeetCode 567)
 * Difficulty: Medium
 * Pattern: S5 - Sliding window on strings
 *
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O((n - m + 1) * m log m)
// Space Complexity: O(m)
export function checkInclusionBruteForce(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const sortedS1 = s1.split('').sort().join('');
  const k = s1.length;

  for (let i = 0; i <= s2.length - k; i++) {
    const sortedSub = s2.slice(i, i + k).split('').sort().join('');
    if (sortedSub === sortedS1) return true;
  }

  return false;
}

// --- 2. Optimal Approach (Fixed Size-k Sliding Window with Matches Count) ---
// Time Complexity: O(n) - where n = s2.length
// Space Complexity: O(1) - fixed 26 alphabet count
export function checkInclusionOptimal(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const s1Count = new Array<number>(26).fill(0);
  const s2Count = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);
  const k = s1.length;

  for (let i = 0; i < k; i++) {
    s1Count[s1.charCodeAt(i) - aCode]++;
    s2Count[s2.charCodeAt(i) - aCode]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (s1Count[i] === s2Count[i]) matches++;
  }

  for (let i = 0; i < s2.length - k; i++) {
    if (matches === 26) return true;

    // Add s2[i + k] to right of window
    const rIdx = s2.charCodeAt(i + k) - aCode;
    s2Count[rIdx]++;
    if (s2Count[rIdx] === s1Count[rIdx]) matches++;
    else if (s2Count[rIdx] === s1Count[rIdx] + 1) matches--;

    // Remove s2[i] from left of window
    const lIdx = s2.charCodeAt(i) - aCode;
    s2Count[lIdx]--;
    if (s2Count[lIdx] === s1Count[lIdx]) matches++;
    else if (s2Count[lIdx] === s1Count[lIdx] - 1) matches--;
  }

  return matches === 26;
}

// --- Test Verification ---
console.assert(checkInclusionOptimal("ab", "eidbaooo") === true, "Test 1 failed");
console.assert(checkInclusionOptimal("ab", "eidboaoo") === false, "Test 2 failed");
