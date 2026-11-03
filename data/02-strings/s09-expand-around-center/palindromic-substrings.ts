/**
 * Problem: Palindromic Substrings (LeetCode 647)
 * Difficulty: Medium
 * Pattern: S9 - Expand around center
 *
 * Given a string s, return the number of palindromic substrings in it.
 */

// --- Optimal Approach (Expand Around Center) ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function countSubstrings(s: string): number {
  let count = 0;

  function countPalindromes(left: number, right: number): number {
    let localCount = 0;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      localCount++;
      left--;
      right++;
    }
    return localCount;
  }

  for (let i = 0; i < s.length; i++) {
    count += countPalindromes(i, i);     // Odd center
    count += countPalindromes(i, i + 1); // Even center
  }

  return count;
}

// --- Test Verification ---
console.assert(countSubstrings("abc") === 3, "Test 1 failed");
console.assert(countSubstrings("aaa") === 6, "Test 2 failed");
