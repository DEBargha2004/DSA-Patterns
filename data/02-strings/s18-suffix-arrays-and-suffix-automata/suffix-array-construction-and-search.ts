/**
 * Problem: Suffix Array and LCP Construction & Binary Search
 * Difficulty: Hard
 * Pattern: S18 - Suffix arrays and suffix automata
 *
 * Build suffix array and LCP (Longest Common Prefix) array for text, and perform sub-string binary search.
 */

// --- Optimal Approach (Suffix Array Construction + Kasai LCP) ---
// Time Complexity: O(n log n) construction, O(m log n) pattern search
// Space Complexity: O(n)
export class SuffixArray {
  public text: string;
  public sa: number[];
  public lcp: number[];

  constructor(text: string) {
    this.text = text;
    this.sa = this.buildSA(text);
    this.lcp = this.buildLCP(text, this.sa);
  }

  private buildSA(s: string): number[] {
    const n = s.length;
    const suffixes = Array.from({ length: n }, (_, i) => i);
    suffixes.sort((a, b) => s.substring(a).localeCompare(s.substring(b)));
    return suffixes;
  }

  private buildLCP(s: string, sa: number[]): number[] {
    const n = s.length;
    const rank = new Array<number>(n);
    for (let i = 0; i < n; i++) rank[sa[i]] = i;

    const lcp = new Array<number>(n).fill(0);
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

  search(pattern: string): boolean {
    let left = 0;
    let right = this.sa.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const suffix = this.text.substring(this.sa[mid], this.sa[mid] + pattern.length);

      if (suffix === pattern) return true;
      if (suffix < pattern) left = mid + 1;
      else right = mid - 1;
    }

    return false;
  }
}

// --- Test Verification ---
const saObj = new SuffixArray("banana");
console.assert(saObj.search("nan") === true, "Test 1 failed");
console.assert(saObj.search("apple") === false, "Test 2 failed");
