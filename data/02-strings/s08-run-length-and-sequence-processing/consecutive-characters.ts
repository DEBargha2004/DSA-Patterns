/**
 * Problem: Consecutive Characters (LeetCode 1446)
 * Difficulty: Easy
 * Pattern: S8 - Run-length and sequence processing
 *
 * The power of the string is the maximum length of a non-empty substring that contains only one unique character.
 * Given a string s, return the power of s.
 */

// --- Optimal Approach (Single Pass Running Count) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxPower(s: string): number {
  let maxCount = 1;
  let currentCount = 1;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 1;
    }
  }

  return maxCount;
}

// --- Test Verification ---
console.assert(maxPower("leetcode") === 2, "Test 1 failed");
console.assert(maxPower("abbcccddddeeeeedcba") === 5, "Test 2 failed");
