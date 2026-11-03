/**
 * Problem: Number of Substrings Containing All Three Characters (LeetCode 1358)
 * Difficulty: Medium
 * Pattern: SW7 - Exact-count constraints using related windows
 *
 * Count substrings containing at least one occurrence of all three characters 'a', 'b', and 'c'.
 */

// --- Optimal Approach (Last Index of Each Char) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
// For right index i, the number of valid substrings ending at i is min(lastPos['a'], lastPos['b'], lastPos['c']) + 1.
export function numberOfSubstrings(s: string): number {
  const last = [-1, -1, -1];
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - 97] = i;
    const minIdx = Math.min(last[0], last[1], last[2]);
    if (minIdx !== -1) {
      count += minIdx + 1;
    }
  }

  return count;
}

// --- Test Verification ---
console.assert(numberOfSubstrings("abcabc") === 10, "Test 1 failed");
console.assert(numberOfSubstrings("aaacb") === 3, "Test 2 failed");
console.assert(numberOfSubstrings("abc") === 1, "Test 3 failed");
