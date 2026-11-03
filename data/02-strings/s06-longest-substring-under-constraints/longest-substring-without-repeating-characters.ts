/**
 * Problem: Longest Substring Without Repeating Characters (LeetCode 3)
 * Difficulty: Medium
 * Pattern: S6 - Longest substring under constraints
 *
 * Given a string s, find the length of the longest substring without duplicate characters.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(min(n, alphabet))
export function lengthOfLongestSubstringBruteForce(s: string): number {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    const seen = new Set<string>();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  return maxLen;
}

// --- 2. Optimal Approach (Sliding Window with Last Seen Index Map) ---
// Time Complexity: O(n) - single pass, jumping left pointer
// Space Complexity: O(min(n, alphabet))
export function lengthOfLongestSubstringOptimal(s: string): number {
  const lastIndex = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastIndex.has(ch)) {
      // Jump left directly past the previous occurrence
      left = Math.max(left, lastIndex.get(ch)! + 1);
    }
    lastIndex.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(lengthOfLongestSubstringOptimal("abcabcbb") === 3, "Test 1 failed");
console.assert(lengthOfLongestSubstringOptimal("bbbbb") === 1, "Test 2 failed");
console.assert(lengthOfLongestSubstringOptimal("pwwkew") === 3, "Test 3 failed");
