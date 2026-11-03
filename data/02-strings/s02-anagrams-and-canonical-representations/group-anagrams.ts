/**
 * Problem: Group Anagrams (LeetCode 49)
 * Difficulty: Medium
 * Pattern: S2 - Anagrams and canonical representations
 *
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 */

// --- 1. Better Approach (Sorted String Key) ---
// Time Complexity: O(n * k log k) where k is max string length
// Space Complexity: O(n * k)
export function groupAnagramsSort(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return Array.from(map.values());
}

// --- 2. Optimal Approach (Character Frequency Tuple / Signature Key) ---
// Time Complexity: O(n * k) - avoids O(k log k) sorting
// Space Complexity: O(n * k)
// Canonical key: "#1#0#0...#2" representing frequencies of 26 letters.
export function groupAnagramsOptimal(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  const aCode = 'a'.charCodeAt(0);

  for (const s of strs) {
    const count = new Array<number>(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - aCode]++;
    }
    const key = count.join('#');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }

  return Array.from(map.values());
}

// --- Test Verification ---
const groups = groupAnagramsOptimal(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.assert(groups.length === 3, "Test failed");
