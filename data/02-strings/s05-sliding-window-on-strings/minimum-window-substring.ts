/**
 * Problem: Minimum Window Substring (LeetCode 76)
 * Difficulty: Hard
 * Pattern: S5 - Sliding window on strings
 *
 * Given two strings s and t, return the minimum window substring of s such that every character
 * in t (including duplicates) is included in the window. If none, return "".
 */

// --- Optimal Approach (Variable Sliding Window with Formed Counter) ---
// Time Complexity: O(s.length + t.length)
// Space Complexity: O(total unique chars) <= O(128) = O(1)
export function minWindow(s: string, t: string): string {
  if (s.length === 0 || t.length === 0 || s.length < t.length) return "";

  const tCount = new Map<string, number>();
  for (const ch of t) tCount.set(ch, (tCount.get(ch) ?? 0) + 1);

  const required = tCount.size;
  const windowCount = new Map<string, number>();
  let formed = 0;

  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    windowCount.set(ch, (windowCount.get(ch) ?? 0) + 1);

    if (tCount.has(ch) && windowCount.get(ch) === tCount.get(ch)) {
      formed++;
    }

    // Try contracting window from left once all characters are matched
    while (left <= right && formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = s[left];
      windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
      if (tCount.has(leftChar) && windowCount.get(leftChar)! < tCount.get(leftChar)!) {
        formed--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

// --- Test Verification ---
console.assert(minWindow("ADOBECODEBANC", "ABC") === "BANC", "Test 1 failed");
console.assert(minWindow("a", "a") === "a", "Test 2 failed");
console.assert(minWindow("a", "aa") === "", "Test 3 failed");
