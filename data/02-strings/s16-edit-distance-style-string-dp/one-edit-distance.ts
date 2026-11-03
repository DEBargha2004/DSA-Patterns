/**
 * Problem: One Edit Distance (LeetCode 161)
 * Difficulty: Medium
 * Pattern: S16 - Edit-distance-style string DP
 *
 * Given two strings s and t, return true if they are both one edit distance apart, otherwise return false.
 */

// --- Optimal Approach (Single-Pass Linear Scan) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function isOneEditDistance(s: string, t: string): boolean {
  const m = s.length;
  const n = t.length;

  if (Math.abs(m - n) > 1) return false;

  for (let i = 0; i < Math.min(m, n); i++) {
    if (s[i] !== t[i]) {
      if (m === n) {
        // Must replace s[i] with t[i]
        return s.substring(i + 1) === t.substring(i + 1);
      } else if (m < n) {
        // Must insert t[i] into s
        return s.substring(i) === t.substring(i + 1);
      } else {
        // Must delete s[i] from s
        return s.substring(i + 1) === t.substring(i);
      }
    }
  }

  // All shared characters matched: edit distance is 1 only if length differs by 1
  return Math.abs(m - n) === 1;
}

// --- Test Verification ---
console.assert(isOneEditDistance("ab", "acb") === true, "Test 1 failed");
console.assert(isOneEditDistance("", "") === false, "Test 2 failed");
console.assert(isOneEditDistance("a", "") === true, "Test 3 failed");
