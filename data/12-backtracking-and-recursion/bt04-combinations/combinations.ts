/**
 * Pattern: Combinations
 * Problem: Combinations (LeetCode 77)
 *
 * Given two integers n and k, return all possible combinations of k numbers chosen from range [1, n].
 */

// Brute Force: Full recursion without range-bound pruning
// Time: O(2^n * k), Space: O(k)
export function combineBrute(n: number, k: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(val: number): void {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    if (val > n) return;

    // Pick
    current.push(val);
    backtrack(val + 1);
    current.pop();

    // Skip
    backtrack(val + 1);
  }

  backtrack(1);
  return result;
}

// Optimal: Backtracking with Pruning Upper Bound (n - (k - current.length) + 1)
// Time: O(C(n, k) * k), Space: O(k)
export function combineOptimal(n: number, k: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    // Prune: if there are not enough remaining elements to reach k, break early
    const maxStart = n - (k - current.length) + 1;
    for (let i = start; i <= maxStart; i++) {
      current.push(i);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(1);
  return result;
}

// Test cases
const c1 = combineBrute(4, 2);
const c2 = combineOptimal(4, 2);
if (c1.length !== 6 || c2.length !== 6) throw new Error("Expected 6 combinations for n=4, k=2");
console.log("Combinations passed!");
