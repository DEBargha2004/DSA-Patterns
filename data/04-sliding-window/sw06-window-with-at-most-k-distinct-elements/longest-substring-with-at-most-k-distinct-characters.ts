/**
 * Problem: Longest Substring with At Most K Distinct Characters (LeetCode 340)
 * Difficulty: Medium
 * Pattern: SW6 - Window with at most k distinct elements
 *
 * Find length of longest substring that contains at most k distinct characters.
 */

// --- Optimal Approach (Sliding Window with Hash Map) ---
// Time Complexity: O(n)
// Space Complexity: O(k)
export function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  if (k === 0) return 0;
  const map = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    map.set(ch, (map.get(ch) ?? 0) + 1);

    while (map.size > k) {
      const l = s[left];
      map.set(l, map.get(l)! - 1);
      if (map.get(l) === 0) map.delete(l);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(lengthOfLongestSubstringKDistinct("eceba", 2) === 3, "Test 1 failed");
console.assert(lengthOfLongestSubstringKDistinct("aa", 1) === 2, "Test 2 failed");
