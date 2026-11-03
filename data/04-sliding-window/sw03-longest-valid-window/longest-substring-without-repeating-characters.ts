/**
 * Problem: Longest Substring Without Repeating Characters (LeetCode 3)
 * Difficulty: Medium
 * Pattern: SW3 - Longest valid window
 *
 * Find length of longest substring without repeating characters.
 */

// --- Optimal Approach (Sliding Window with Index Jump) ---
// Time Complexity: O(n)
// Space Complexity: O(min(n, alphabet))
export function lengthOfLongestSubstring(s: string): number {
  const lastPos = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastPos.has(ch)) {
      left = Math.max(left, lastPos.get(ch)! + 1);
    }
    lastPos.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(lengthOfLongestSubstring("abcabcbb") === 3, "Test 1 failed");
console.assert(lengthOfLongestSubstring("bbbbb") === 1, "Test 2 failed");
