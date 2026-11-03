/**
 * Problem: Minimum Window Subsequence (LeetCode 727)
 * Difficulty: Hard
 * Pattern: SW4 - Shortest window satisfying a condition
 *
 * Given strings s1 and s2, return the minimum contiguous substring of s1 such that s2 is a subsequence.
 */

// --- Optimal Approach (Two Pointers with Reverse Optimization) ---
// Time Complexity: O(s1.length * s2.length)
// Space Complexity: O(1)
export function minWindowSubsequence(s1: string, s2: string): string {
  let i = 0;
  let minStart = -1;
  let minLen = Infinity;

  while (i < s1.length) {
    let j = 0;
    while (i < s1.length && j < s2.length) {
      if (s1[i] === s2[j]) j++;
      i++;
    }

    if (j === s2.length) {
      // Step backwards to find minimum start index for this match
      let end = i - 1;
      let k = s2.length - 1;
      while (k >= 0) {
        if (s1[end] === s2[k]) k--;
        end--;
      }
      end++;

      if (i - end < minLen) {
        minLen = i - end;
        minStart = end;
      }

      i = end + 1; // Restart search just after the optimized start
    }
  }

  return minStart === -1 ? "" : s1.substring(minStart, minStart + minLen);
}

// --- Test Verification ---
console.assert(minWindowSubsequence("abcdebdde", "bde") === "bcde", "Test 1 failed");
console.assert(minWindowSubsequence("jmeqqaeqpr", "ld") === "", "Test 2 failed");
