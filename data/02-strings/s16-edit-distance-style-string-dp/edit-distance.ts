/**
 * Problem: Edit Distance (LeetCode 72)
 * Difficulty: Medium
 * Pattern: S16 - Edit-distance-style string DP
 *
 * Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
 * Operations: Insert, Delete, Replace.
 */

// --- Optimal Approach (2D Dynamic Programming with Space Optimization) ---
// Time Complexity: O(m * n)
// Space Complexity: O(n)
export function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);

  for (let i = 1; i <= m; i++) {
    const curr = new Array<number>(n + 1).fill(0);
    curr[0] = i;

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(
          prev[j],     // Delete from word1
          curr[j - 1], // Insert into word1
          prev[j - 1]  // Replace in word1
        );
      }
    }
    prev = curr;
  }

  return prev[n];
}

// --- Test Verification ---
console.assert(minDistance("horse", "ros") === 3, "Test 1 failed");
console.assert(minDistance("intention", "execution") === 5, "Test 2 failed");
