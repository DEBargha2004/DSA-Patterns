/**
 * Problem: Check If String Is a Prefix of Array (LeetCode 1961)
 * Difficulty: Easy
 * Pattern: S10 - Prefix and suffix matching
 *
 * Given a string s and an array of strings words, determine if s is a prefix string of words.
 */

// --- Optimal Approach (Single-Pass Prefix Accumulation) ---
// Time Complexity: O(s.length)
// Space Complexity: O(1)
export function isPrefixString(s: string, words: string[]): boolean {
  let accumulated = "";

  for (const word of words) {
    accumulated += word;
    if (accumulated === s) return true;
    if (!s.startsWith(accumulated)) return false;
  }

  return false;
}

// --- Test Verification ---
console.assert(isPrefixString("iloveleetcode", ["i", "love", "leetcode", "apples"]) === true, "Test 1 failed");
console.assert(isPrefixString("iloveleetcode", ["apples", "i", "love", "leetcode"]) === false, "Test 2 failed");
