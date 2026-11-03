/**
 * Pattern: Combinations
 * Problem: Combination Sum III (LeetCode 216)
 *
 * Find all valid combinations of k numbers that sum up to n such that only numbers
 * 1 through 9 are used and each number is used at most once.
 */

// Brute Force: Enumerate all 2^9 subsets and check length === k and sum === n
// Time: O(2^9 * 9), Space: O(k)
export function combinationSum3Brute(k: number, n: number): number[][] {
  const result: number[][] = [];

  for (let mask = 0; mask < (1 << 9); mask++) {
    const subset: number[] = [];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      if ((mask & (1 << i)) !== 0) {
        const val = i + 1;
        subset.push(val);
        sum += val;
      }
    }
    if (subset.length === k && sum === n) {
      result.push(subset);
    }
  }
  return result;
}

// Optimal: Backtracking with sum pruning and bounds
// Time: O(C(9, k) * k), Space: O(k) stack
export function combinationSum3Optimal(k: number, n: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number, remain: number): void {
    if (path.length === k) {
      if (remain === 0) result.push([...path]);
      return;
    }
    if (remain <= 0) return;

    for (let i = start; i <= 9; i++) {
      if (i > remain) break; // Pruning since numbers are strictly positive and ascending
      path.push(i);
      backtrack(i + 1, remain - i);
      path.pop();
    }
  }

  backtrack(1, n);
  return result;
}

// Test cases
const cs3_1 = combinationSum3Brute(3, 7);
const cs3_2 = combinationSum3Optimal(3, 7);
if (cs3_1.length !== 1 || cs3_2.length !== 1 || cs3_2[0].join(",") !== "1,2,4") {
  throw new Error("Mismatch in combination sum 3");
}
console.log("Combination Sum III passed!");
