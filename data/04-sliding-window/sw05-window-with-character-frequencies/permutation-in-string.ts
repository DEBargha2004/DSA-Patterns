/**
 * Problem: Permutation in String (LeetCode 567)
 * Difficulty: Medium
 * Pattern: SW5 - Window with character frequencies
 *
 * Return true if s2 contains a permutation of s1.
 */

// --- Optimal Approach (Fixed Size-k Frequency Window) ---
// Time Complexity: O(s2.length)
// Space Complexity: O(1)
export function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const count1 = new Array<number>(26).fill(0);
  const count2 = new Array<number>(26).fill(0);
  const a = 'a'.charCodeAt(0);
  const k = s1.length;

  for (let i = 0; i < k; i++) {
    count1[s1.charCodeAt(i) - a]++;
    count2[s2.charCodeAt(i) - a]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (count1[i] === count2[i]) matches++;
  }

  for (let i = 0; i < s2.length - k; i++) {
    if (matches === 26) return true;

    const r = s2.charCodeAt(i + k) - a;
    count2[r]++;
    if (count2[r] === count1[r]) matches++;
    else if (count2[r] === count1[r] + 1) matches--;

    const l = s2.charCodeAt(i) - a;
    count2[l]--;
    if (count2[l] === count1[l]) matches++;
    else if (count2[l] === count1[l] - 1) matches--;
  }

  return matches === 26;
}

// --- Test Verification ---
console.assert(checkInclusion("ab", "eidbaooo") === true, "Test 1 failed");
console.assert(checkInclusion("ab", "eidboaoo") === false, "Test 2 failed");
