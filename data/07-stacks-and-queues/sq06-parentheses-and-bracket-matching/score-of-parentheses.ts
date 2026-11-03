/**
 * Problem: Score of Parentheses (LeetCode 856)
 * Difficulty: Medium
 * Pattern: SQ6 - Parentheses and bracket matching
 *
 * Compute score:
 * - "()" has score 1.
 * - AB has score A + B.
 * - (A) has score 2 * A.
 */

// --- Optimal Approach (Depth-Based Direct Calculation) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function scoreOfParentheses(s: string): number {
  let score = 0;
  let depth = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      depth++;
    } else {
      depth--;
      if (s[i - 1] === "(") {
        score += 1 << depth;
      }
    }
  }

  return score;
}

// --- Test Verification ---
console.assert(scoreOfParentheses("()") === 1, "Test 1 failed");
console.assert(scoreOfParentheses("(())") === 2, "Test 2 failed");
console.assert(scoreOfParentheses("()()") === 2, "Test 3 failed");
console.assert(scoreOfParentheses("(()(()))") === 6, "Test 4 failed");
