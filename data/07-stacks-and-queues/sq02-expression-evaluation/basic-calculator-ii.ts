/**
 * Problem: Basic Calculator II (LeetCode 227)
 * Difficulty: Medium
 * Pattern: SQ2 - Expression evaluation
 *
 * Given a string s containing non-negative integers, '+', '-', '*', '/' operators and spaces, evaluate it.
 */

// --- Optimal Approach (Stack with Operator Precedence) ---
// Time Complexity: O(n)
// Space Complexity: O(n) (or O(1) space with rolling variables)
export function calculateII(s: string): number {
  const stack: number[] = [];
  let currentNum = 0;
  let operation = "+";

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch >= "0" && ch <= "9") {
      currentNum = currentNum * 10 + (ch.charCodeAt(0) - 48);
    }

    if ((ch !== " " && (ch < "0" || ch > "9")) || i === s.length - 1) {
      if (operation === "+") {
        stack.push(currentNum);
      } else if (operation === "-") {
        stack.push(-currentNum);
      } else if (operation === "*") {
        const top = stack.pop()!;
        stack.push(top * currentNum);
      } else if (operation === "/") {
        const top = stack.pop()!;
        stack.push(Math.trunc(top / currentNum));
      }
      operation = ch;
      currentNum = 0;
    }
  }

  return stack.reduce((acc, val) => acc + val, 0);
}

// --- Test Verification ---
console.assert(calculateII("3+2*2") === 7, "Test 1 failed");
console.assert(calculateII(" 3/2 ") === 1, "Test 2 failed");
console.assert(calculateII(" 3+5 / 2 ") === 5, "Test 3 failed");
console.assert(calculateII("14-3/2") === 13, "Test 4 failed");
