/**
 * Problem: Longest Valid Parentheses (LeetCode 32)
 * Difficulty: Hard
 * Pattern: SQ6 - Parentheses and bracket matching
 *
 * Given a string containing just the characters '(' and ')', return the length of the longest valid parentheses substring.
 */

// --- Optimal Approach (Stack of Indices) ---
// Stack stores the index of the last unmatched closing parenthesis (or previous boundary)
// Time Complexity: O(n)
// Space Complexity: O(n)
export function longestValidParentheses(s: string): number {
  const stack: number[] = [-1];
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}

// --- Test Verification ---
console.assert(longestValidParentheses("(()") === 2, "Test 1 failed");
console.assert(longestValidParentheses(")()())") === 4, "Test 2 failed");
console.assert(longestValidParentheses("") === 0, "Test 3 failed");
console.assert(longestValidParentheses("()(())") === 6, "Test 4 failed");
