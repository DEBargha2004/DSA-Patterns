/**
 * Problem: Longest Substring with At Most K Distinct Characters (LeetCode 340)
 * Difficulty: Medium
 * Pattern: S6 - Longest substring under constraints
 *
 * Given a string s and an integer k, return the length of the longest substring of s
 * that contains at most k distinct characters.
 */

// --- Optimal Approach (Sliding Window with Character Frequency Map) ---
// Time Complexity: O(n)
// Space Complexity: O(k)
export function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  if (k === 0) return 0;

  const freq = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    freq.set(ch, (freq.get(ch) ?? 0) + 1);

    while (freq.size > k) {
      const lChar = s[left];
      freq.set(lChar, freq.get(lChar)! - 1);
      if (freq.get(lChar) === 0) {
        freq.delete(lChar);
      }
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(lengthOfLongestSubstringKDistinct("eceba", 2) === 3, "Test 1 failed");
console.assert(lengthOfLongestSubstringKDistinct("aa", 1) === 2, "Test 2 failed");
