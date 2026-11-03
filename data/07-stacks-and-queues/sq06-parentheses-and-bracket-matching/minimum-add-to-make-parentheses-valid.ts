/**
 * Problem: Minimum Add to Make Parentheses Valid (LeetCode 921)
 * Difficulty: Medium
 * Pattern: SQ6 - Parentheses and bracket matching
 *
 * Return the minimum number of parentheses we must add to make the resulting string valid.
 */

// --- Optimal Approach (Balance Counters - O(1) Space) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function minAddToMakeValid(s: string): number {
  let openNeeded = 0;
  let closeNeeded = 0;

  for (const ch of s) {
    if (ch === "(") {
      closeNeeded++;
    } else {
      if (closeNeeded > 0) {
        closeNeeded--;
      } else {
        openNeeded++;
      }
    }
  }

  return openNeeded + closeNeeded;
}

// --- Test Verification ---
console.assert(minAddToMakeValid("())") === 1, "Test 1 failed");
console.assert(minAddToMakeValid("(((") === 3, "Test 2 failed");
console.assert(minAddToMakeValid("()") === 0, "Test 3 failed");
console.assert(minAddToMakeValid("()))((") === 4, "Test 4 failed");
