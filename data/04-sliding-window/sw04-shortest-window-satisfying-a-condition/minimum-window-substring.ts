/**
 * Problem: Minimum Window Substring (LeetCode 76)
 * Difficulty: Hard
 * Pattern: SW4 - Shortest window satisfying a condition
 *
 * Find minimum substring in s that contains all characters of t.
 */

// --- Optimal Approach (Variable Sliding Window Shrink to Minimum) ---
// Time Complexity: O(s + t)
// Space Complexity: O(1)
export function minWindow(s: string, t: string): string {
  if (s.length < t.length) return "";

  const tCount = new Map<string, number>();
  for (const c of t) tCount.set(c, (tCount.get(c) ?? 0) + 1);

  const window = new Map<string, number>();
  let formed = 0;
  const required = tCount.size;

  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) ?? 0) + 1);

    if (tCount.has(ch) && window.get(ch) === tCount.get(ch)) {
      formed++;
    }

    while (left <= right && formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const lChar = s[left];
      window.set(lChar, window.get(lChar)! - 1);
      if (tCount.has(lChar) && window.get(lChar)! < tCount.get(lChar)!) {
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
