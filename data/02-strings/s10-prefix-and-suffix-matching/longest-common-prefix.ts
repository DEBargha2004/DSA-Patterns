/**
 * Problem: Longest Common Prefix (LeetCode 14)
 * Difficulty: Easy
 * Pattern: S10 - Prefix and suffix matching
 *
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 */

// --- 1. Brute Force Approach (Horizontal Scanning) ---
// Time Complexity: O(s) where s is sum of all characters in all strings
// Space Complexity: O(1)
export function longestCommonPrefixHorizontal(strs: string[]): string {
  if (strs.length === 0) return "";
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

// --- 2. Optimal Approach (Vertical Scanning) ---
// Time Complexity: O(s) - stops at the very first mismatch column
// Space Complexity: O(1)
export function longestCommonPrefixOptimal(strs: string[]): string {
  if (strs.length === 0) return "";

  for (let col = 0; col < strs[0].length; col++) {
    const ch = strs[0][col];
    for (let row = 1; row < strs.length; row++) {
      if (col >= strs[row].length || strs[row][col] !== ch) {
        return strs[0].substring(0, col);
      }
    }
  }

  return strs[0];
}

// --- Test Verification ---
console.assert(longestCommonPrefixOptimal(["flower", "flow", "flight"]) === "fl", "Test 1 failed");
console.assert(longestCommonPrefixOptimal(["dog", "racecar", "car"]) === "", "Test 2 failed");
