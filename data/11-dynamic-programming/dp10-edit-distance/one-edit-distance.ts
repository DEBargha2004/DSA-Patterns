/**
 * Problem: One Edit Distance (LeetCode 161 analog)
 * Difficulty: Medium
 * Pattern: DP10 - Edit distance
 *
 * Check if strings s and t are exactly one edit distance away.
 */

// --- Optimal Approach (Single Pass String Scan - O(n)) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function isOneEditDistance(s: string, t: string): boolean {
  const m = s.length;
  const n = t.length;
  if (Math.abs(m - n) > 1) return false;

  for (let i = 0; i < Math.min(m, n); i++) {
    if (s[i] !== t[i]) {
      if (m === n) {
        // Replacement check
        return s.slice(i + 1) === t.slice(i + 1);
      } else if (m < n) {
        // Insertion into s check
        return s.slice(i) === t.slice(i + 1);
      } else {
        // Deletion from s check
        return s.slice(i + 1) === t.slice(i);
      }
    }
  }

  return Math.abs(m - n) === 1;
}

// --- Test Verification ---
console.assert(isOneEditDistance("ab", "acb") === true, "Test 1 failed");
console.assert(isOneEditDistance("", "") === false, "Test 2 failed");
console.assert(isOneEditDistance("a", "") === true, "Test 3 failed");
console.assert(isOneEditDistance("abc", "abc") === false, "Test 4 failed");
