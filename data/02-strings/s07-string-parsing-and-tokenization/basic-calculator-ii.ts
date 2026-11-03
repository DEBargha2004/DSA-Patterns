/**
 * Problem: Basic Calculator II (LeetCode 227)
 * Difficulty: Medium
 * Pattern: S7 - String parsing and tokenization
 *
 * Given a string s which represents an expression, evaluate this expression and return its value.
 * Operators: '+', '-', '*', '/'. Integer division truncates toward zero.
 */

// --- Optimal Approach (Single Pass with Stack / Running Sum) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function calculate(s: string): number {
  const stack: number[] = [];
  let currentNumber = 0;
  let operation = '+';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch >= '0' && ch <= '9') {
      currentNumber = currentNumber * 10 + (ch.charCodeAt(0) - 48);
    }

    if ((!(ch >= '0' && ch <= '9') && ch !== ' ') || i === s.length - 1) {
      if (operation === '+') {
        stack.push(currentNumber);
      } else if (operation === '-') {
        stack.push(-currentNumber);
      } else if (operation === '*') {
        stack.push(stack.pop()! * currentNumber);
      } else if (operation === '/') {
        stack.push(Math.trunc(stack.pop()! / currentNumber));
      }
      operation = ch;
      currentNumber = 0;
    }
  }

  return stack.reduce((acc, val) => acc + val, 0);
}

// --- Test Verification ---
console.assert(calculate("3+2*2") === 7, "Test 1 failed");
console.assert(calculate(" 3/2 ") === 1, "Test 2 failed");
console.assert(calculate(" 3+5 / 2 ") === 5, "Test 3 failed");
