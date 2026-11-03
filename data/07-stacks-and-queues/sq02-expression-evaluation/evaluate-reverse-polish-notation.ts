/**
 * Problem: Evaluate Reverse Polish Notation (LeetCode 150)
 * Difficulty: Medium
 * Pattern: SQ2 - Expression evaluation
 *
 * Evaluate the value of an arithmetic expression in Reverse Polish Notation.
 */

// --- Optimal Approach (Stack Evaluation) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop()!;
      const a = stack.pop()!;
      let res = 0;
      if (token === "+") res = a + b;
      else if (token === "-") res = a - b;
      else if (token === "*") res = a * b;
      else res = Math.trunc(a / b);
      stack.push(res);
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop()!;
}

// --- Test Verification ---
console.assert(evalRPN(["2", "1", "+", "3", "*"]) === 9, "Test 1 failed");
console.assert(evalRPN(["4", "13", "5", "/", "+"]) === 6, "Test 2 failed");
console.assert(evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]) === 22, "Test 3 failed");
