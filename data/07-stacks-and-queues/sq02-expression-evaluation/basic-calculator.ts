/**
 * Problem: Basic Calculator (LeetCode 224)
 * Difficulty: Hard
 * Pattern: SQ2 - Expression evaluation
 *
 * Given a string s representing a valid expression with '+', '-', '(', ')', and spaces, evaluate it.
 */

// --- Optimal Approach (Stack with Sign Management) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function calculate(s: string): number {
  let result = 0;
  let currentNum = 0;
  let sign = 1;
  const stack: number[] = [];

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch >= "0" && ch <= "9") {
      currentNum = currentNum * 10 + (ch.charCodeAt(0) - 48);
    } else if (ch === "+") {
      result += sign * currentNum;
      currentNum = 0;
      sign = 1;
    } else if (ch === "-") {
      result += sign * currentNum;
      currentNum = 0;
      sign = -1;
    } else if (ch === "(") {
      // Save current result and sign onto stack
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (ch === ")") {
      result += sign * currentNum;
      currentNum = 0;
      const prevSign = stack.pop()!;
      const prevResult = stack.pop()!;
      result = prevResult + prevSign * result;
    }
  }

  result += sign * currentNum;
  return result;
}

// --- Test Verification ---
console.assert(calculate("1 + 1") === 2, "Test 1 failed");
console.assert(calculate(" 2-1 + 2 ") === 3, "Test 2 failed");
console.assert(calculate("(1+(4+5+2)-3)+(6+8)") === 23, "Test 3 failed");
console.assert(calculate("- (3 + (4 + 5))") === -12, "Test 4 failed");
