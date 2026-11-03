/**
 * Pattern: Recursive enumeration
 * Problem: Generate Parentheses (LeetCode 22)
 *
 * Given n pairs of parentheses, write a function to generate all combinations
 * of well-formed parentheses.
 */

// Brute Force: Generate all 2^(2n) sequences of '(' and ')' and validate
// Time: O(2^(2n) * n), Space: O(n)
export function generateParenthesisBrute(n: number): string[] {
  const result: string[] = [];
  const totalLength = 2 * n;

  function isValid(s: string): boolean {
    let balance = 0;
    for (const ch of s) {
      if (ch === '(') balance++;
      else balance--;
      if (balance < 0) return false;
    }
    return balance === 0;
  }

  function generateAll(current: string): void {
    if (current.length === totalLength) {
      if (isValid(current)) result.push(current);
      return;
    }
    generateAll(current + "(");
    generateAll(current + ")");
  }

  generateAll("");
  return result;
}

// Optimal: Backtracking with open and close count invariants (Catalan number)
// Time: O(4^n / sqrt(n)), Space: O(n) call stack auxiliary
export function generateParenthesisOptimal(n: number): string[] {
  const result: string[] = [];
  const path: string[] = [];

  function backtrack(open: number, close: number): void {
    if (path.length === 2 * n) {
      result.push(path.join(""));
      return;
    }

    if (open < n) {
      path.push("(");
      backtrack(open + 1, close);
      path.pop();
    }

    if (close < open) {
      path.push(")");
      backtrack(open, close + 1);
      path.pop();
    }
  }

  backtrack(0, 0);
  return result;
}

// Test cases
const resBrute = generateParenthesisBrute(3);
const resOpt = generateParenthesisOptimal(3);
if (resBrute.length !== 5 || resOpt.length !== 5) throw new Error("Expected 5 combinations for n=3");
if (!resOpt.includes("((()))") || !resOpt.includes("()()()")) throw new Error("Missing patterns");
console.log("Generate Parentheses passed!");
