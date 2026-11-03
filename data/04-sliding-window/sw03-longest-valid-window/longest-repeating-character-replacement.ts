/**
 * Problem: Longest Repeating Character Replacement (LeetCode 424)
 * Difficulty: Medium
 * Pattern: SW3 - Longest valid window
 *
 * Find length of longest substring with same letter by replacing at most k characters.
 */

// --- Optimal Approach (Sliding Window Non-Decreasing Window Length) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function characterReplacement(s: string, k: number): number {
  const counts = new Array<number>(26).fill(0);
  const aCode = 'A'.charCodeAt(0);
  let left = 0;
  let maxFreq = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const r = s.charCodeAt(right) - aCode;
    counts[r]++;
    maxFreq = Math.max(maxFreq, counts[r]);

    if ((right - left + 1) - maxFreq > k) {
      counts[s.charCodeAt(left) - aCode]--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(characterReplacement("ABAB", 2) === 4, "Test 1 failed");
console.assert(characterReplacement("AABABBA", 1) === 4, "Test 2 failed");
