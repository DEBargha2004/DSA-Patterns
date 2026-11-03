/**
 * Pattern: Duplicate avoidance / Sequence validation
 * Problem: Split Array into Fibonacci Sequence (LeetCode 842)
 *
 * Given a string num of digits, split it into a Fibonacci-like sequence [F[0], F[1], ..., F[k]]
 * such that F[i] + F[i+1] = F[i+2] and each number fits in 32-bit signed integer.
 */

// Brute Force: Pick first two numbers with double nested loops, then verify the rest iteratively
// Time: O(N^2 * N), Space: O(N)
export function splitIntoFibonacciBrute(num: string): number[] {
  const MAX = 2147483647;
  const n = num.length;

  for (let i = 1; i <= Math.min(10, n - 2); i++) {
    const s1 = num.slice(0, i);
    if (s1.length > 1 && s1[0] === '0') break;
    const n1 = parseInt(s1, 10);
    if (n1 > MAX) break;

    for (let j = 1; j <= Math.min(10, n - i - 1); j++) {
      const s2 = num.slice(i, i + j);
      if (s2.length > 1 && s2[0] === '0') break;
      const n2 = parseInt(s2, 10);
      if (n2 > MAX) break;

      const seq: number[] = [n1, n2];
      let k = i + j;
      let prev1 = n1;
      let prev2 = n2;
      let valid = true;

      while (k < n) {
        const nextVal = prev1 + prev2;
        if (nextVal > MAX) { valid = false; break; }
        const nextStr = nextVal.toString();
        if (!num.startsWith(nextStr, k)) { valid = false; break; }
        seq.push(nextVal);
        k += nextStr.length;
        prev1 = prev2;
        prev2 = nextVal;
      }

      if (valid && seq.length >= 3) return seq;
    }
  }
  return [];
}

// Optimal: Recursive Backtracking with Early Pruning
// Time: O(N^2), Space: O(N) call stack
export function splitIntoFibonacciOptimal(num: string): number[] {
  const MAX = 2147483647;
  const result: number[] = [];

  function backtrack(index: number): boolean {
    if (index === num.length && result.length >= 3) {
      return true;
    }

    let currentVal = 0;
    for (let i = index; i < num.length; i++) {
      if (i > index && num[index] === '0') break; // No leading zeroes
      currentVal = currentVal * 10 + (num.charCodeAt(i) - 48);
      if (currentVal > MAX) break;

      const len = result.length;
      if (len >= 2) {
        const expected = result[len - 1] + result[len - 2];
        if (currentVal < expected) continue;
        if (currentVal > expected) break; // Prune branch
      }

      result.push(currentVal);
      if (backtrack(i + 1)) return true;
      result.pop();
    }

    return false;
  }

  backtrack(0);
  return result;
}

// Test cases
const fib1 = splitIntoFibonacciBrute("1101111");
const fib2 = splitIntoFibonacciOptimal("1101111");
if (fib1.length < 3 || fib2.length < 3 || fib2.join(",") !== "11,0,11,11") {
  throw new Error("Mismatch in split into fibonacci");
}
console.log("Split Array into Fibonacci Sequence passed!");
