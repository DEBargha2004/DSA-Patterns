/**
 * Problem: Valid Parentheses (LeetCode 20)
 * Difficulty: Easy
 * Pattern: SQ1 - Stack-based matching and validation
 *
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 */

// --- Brute Force Approach ---
// Repeatedly eliminate matched pairs until string stops changing
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function isValidBrute(s: string): boolean {
  let prevLen = -1;
  while (s.length !== prevLen) {
    prevLen = s.length;
    s = s.replace("()", "").replace("{}", "").replace("[]", "");
  }
  return s.length === 0;
}

// --- Optimal Approach (Stack with HashMap) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "["
  };

  for (const ch of s) {
    if (ch in map) {
      if (stack.length === 0 || stack[stack.length - 1] !== map[ch]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
}

// --- Test Verification ---
console.assert(isValidBrute("()[]{}") === true, "Brute 1 failed");
console.assert(isValidBrute("(]") === false, "Brute 2 failed");
console.assert(isValid("()[]{}") === true, "Optimal 1 failed");
console.assert(isValid("(]") === false, "Optimal 2 failed");
console.assert(isValid("([{}])") === true, "Optimal 3 failed");
console.assert(isValid("(") === false, "Optimal 4 failed");
