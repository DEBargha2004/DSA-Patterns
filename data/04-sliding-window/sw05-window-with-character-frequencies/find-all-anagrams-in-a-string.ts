/**
 * Problem: Find All Anagrams in a String (LeetCode 438)
 * Difficulty: Medium
 * Pattern: SW5 - Window with character frequencies
 *
 * Return start indices of p's anagrams in s.
 */

// --- Optimal Approach (Sliding Frequency Window) ---
// Time Complexity: O(s.length)
// Space Complexity: O(1)
export function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  if (s.length < p.length) return result;

  const pCount = new Array<number>(26).fill(0);
  const sCount = new Array<number>(26).fill(0);
  const a = 'a'.charCodeAt(0);
  const k = p.length;

  for (let i = 0; i < k; i++) {
    pCount[p.charCodeAt(i) - a]++;
    sCount[s.charCodeAt(i) - a]++;
  }

  const equals = () => {
    for (let i = 0; i < 26; i++) {
      if (pCount[i] !== sCount[i]) return false;
    }
    return true;
  };

  if (equals()) result.push(0);

  for (let i = k; i < s.length; i++) {
    sCount[s.charCodeAt(i) - a]++;
    sCount[s.charCodeAt(i - k) - a]--;
    if (equals()) result.push(i - k + 1);
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(findAnagrams("cbaebabacd", "abc")) === JSON.stringify([0, 6]), "Test failed");
