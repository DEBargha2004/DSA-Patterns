/**
 * Problem: Longest Repeating Character Replacement (LeetCode 424)
 * Difficulty: Medium
 * Pattern: S5 - Sliding window on strings
 *
 * You are given a string s and an integer k. You can choose any character of the string and change it
 * to any other uppercase English character at most k times.
 * Return the length of the longest substring containing the same letter you can get.
 */

// --- Optimal Approach (Sliding Window with Max Frequency Optimization) ---
// Time Complexity: O(n) - single pass, window never shrinks
// Space Complexity: O(1) - 26 uppercase letters
// Invariant: window is valid if (windowLength - maxFreq <= k).
export function characterReplacement(s: string, k: number): number {
  const counts = new Array<number>(26).fill(0);
  const aCode = 'A'.charCodeAt(0);
  let left = 0;
  let maxFreq = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const rIdx = s.charCodeAt(right) - aCode;
    counts[rIdx]++;
    maxFreq = Math.max(maxFreq, counts[rIdx]);

    // If characters to replace exceed k, slide left forward
    if ((right - left + 1) - maxFreq > k) {
      counts[s.charCodeAt(left) - aCode]--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// --- Test Verification ---
console.assert(characterReplacement("ABAB", 2) === 4, "Test 1 failed");
console.assert(characterReplacement("AABABBA", 1) === 4, "Test 2 failed");
