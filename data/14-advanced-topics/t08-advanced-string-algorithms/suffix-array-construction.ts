/**
 * Pattern: Advanced string algorithms
 * Problem: Suffix Array and LCP Array Construction
 */

// Brute Force: Suffix Array construction via native string sorting
// Time: O(N^2 log N), Space: O(N^2)
export function suffixArrayBrute(s: string): number[] {
  const n = s.length;
  const suffixes: { suffix: string; index: number }[] = [];
  for (let i = 0; i < n; i++) {
    suffixes.push({ suffix: s.slice(i), index: i });
  }
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
  return suffixes.map(x => x.index);
}

// Optimal: Kasai's Algorithm for Longest Common Prefix (LCP) Array given Suffix Array
// Time: O(N), Space: O(N)
export function buildLCPArray(s: string, sa: number[]): number[] {
  const n = s.length;
  const rank = new Array(n).fill(0);
  for (let i = 0; i < n; i++) rank[sa[i]] = i;

  const lcp = new Array(n).fill(0);
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
    lcp[rank[i]] = k;
    if (k > 0) k--;
  }

  return lcp;
}

// Test cases
const sStr = "banana";
const sa = suffixArrayBrute(sStr);
const lcp = buildLCPArray(sStr, sa);
if (sa.join(",") !== "5,3,1,0,4,2") throw new Error("Expected suffix array [5,3,1,0,4,2]");
if (lcp.slice(0, 5).join(",") !== "1,3,0,0,2") throw new Error("LCP array mismatch");
console.log("Suffix Array Construction passed!");
