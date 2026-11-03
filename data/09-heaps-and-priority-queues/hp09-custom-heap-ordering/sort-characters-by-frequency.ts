/**
 * Problem: Sort Characters By Frequency (LeetCode 451)
 * Difficulty: Medium
 * Pattern: HP9 - Custom heap ordering
 *
 * Sort string characters by descending frequency.
 */

// --- Optimal Approach (Frequency Map + Max-Heap / Bucket Sort) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function frequencySort(s: string): string {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);

  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  let result = "";
  for (const [ch, freq] of entries) {
    result += ch.repeat(freq);
  }

  return result;
}

// --- Test Verification ---
const s1 = frequencySort("tree");
console.assert(s1 === "eert" || s1 === "eetr", "Test 1 failed");
const s2 = frequencySort("cccaaa");
console.assert(s2 === "cccaaa" || s2 === "aaaccc", "Test 2 failed");
