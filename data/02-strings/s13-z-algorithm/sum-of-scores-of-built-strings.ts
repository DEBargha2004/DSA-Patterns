/**
 * Problem: Sum of Scores of Built Strings (LeetCode 2223)
 * Difficulty: Hard
 * Pattern: S13 - Z-algorithm
 *
 * The score of a string si is the length of the longest common prefix between si and sn.
 * Return the sum of scores of all built strings s1, s2, ..., sn.
 */

// --- Optimal Approach (Sum of Z-Array Values + n) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function sumScores(s: string): number {
  const n = s.length;
  const z = new Array<number>(n).fill(0);
  let l = 0, r = 0;

  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }

  let totalScore = n; // sn itself matches prefix of length n
  for (let i = 1; i < n; i++) {
    totalScore += z[i];
  }

  return totalScore;
}

// --- Test Verification ---
console.assert(sumScores("babab") === 9, "Test 1 failed");
console.assert(sumScores("azbazbzaz") === 14, "Test 2 failed");
