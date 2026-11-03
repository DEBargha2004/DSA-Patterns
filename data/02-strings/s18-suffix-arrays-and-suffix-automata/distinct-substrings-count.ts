/**
 * Problem: Number of Distinct Substrings in a String (LeetCode 1698 / Suffix Array Application)
 * Difficulty: Medium
 * Pattern: S18 - Suffix arrays and suffix automata
 *
 * Given a string s, return the number of distinct substrings in s.
 */

// --- Optimal Approach (Formula: n*(n+1)/2 - sum(LCP)) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function countDistinctSubstrings(s: string): number {
  const n = s.length;
  const sa = Array.from({ length: n }, (_, i) => i);
  sa.sort((a, b) => s.substring(a).localeCompare(s.substring(b)));

  const rank = new Array<number>(n);
  for (let i = 0; i < n; i++) rank[sa[i]] = i;

  let sumLCP = 0;
  let k = 0;

  for (let i = 0; i < n; i++) {
    if (rank[i] === n - 1) {
      k = 0;
      continue;
    }
    const j = sa[rank[i] + 1];
    while (i + k < n && j + k < n && s[i + k] === s[j + k]) {
      k++;
    }
    sumLCP += k;
    if (k > 0) k--;
  }

  const totalSubstrings = (n * (n + 1)) / 2;
  return totalSubstrings - sumLCP;
}

// --- Test Verification ---
console.assert(countDistinctSubstrings("aabbaba") === 21, "Test 1 failed");
console.assert(countDistinctSubstrings("abcdefg") === 28, "Test 2 failed");
