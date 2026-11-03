/**
 * Problem: Get Equal Substrings Within Budget (LeetCode 1208)
 * Difficulty: Medium
 * Pattern: SW6 - Window with at most k distinct cost
 *
 * Return maximum length of substring of s that can be changed to be identical to t with cost <= maxCost.
 */

// --- Optimal Approach (Variable Sliding Window Cost Accumulator) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function equalSubstring(s: string, t: string, maxCost: number): number {
  let left = 0;
  let currentCost = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    currentCost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));

    while (currentCost > maxCost) {
      currentCost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(equalSubstring("abcd", "bcdf", 3) === 3, "Test 1 failed");
console.assert(equalSubstring("abcd", "cdef", 3) === 1, "Test 2 failed");
console.assert(equalSubstring("abcd", "acde", 0) === 1, "Test 3 failed");
