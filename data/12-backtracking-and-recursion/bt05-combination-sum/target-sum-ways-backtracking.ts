/**
 * Pattern: Combination sum
 * Problem: Expression Add Operators / Target Sum Ways Backtracking (LeetCode 282 / 494)
 *
 * Given an integer array nums and an integer target, find the number of ways to assign
 * '+' and '-' to each integer such that the total sum equals target.
 */

// Brute Force: Full binary tree recursion exploring both '+' and '-'
// Time: O(2^N), Space: O(N)
export function findTargetSumWaysBrute(nums: number[], target: number): number {
  let count = 0;

  function backtrack(index: number, currentSum: number): void {
    if (index === nums.length) {
      if (currentSum === target) count++;
      return;
    }
    backtrack(index + 1, currentSum + nums[index]);
    backtrack(index + 1, currentSum - nums[index]);
  }

  backtrack(0, 0);
  return count;
}

// Optimal: Memoized Backtracking (or Subset Sum transformation)
// Time: O(N * Sum), Space: O(N * Sum)
export function findTargetSumWaysOptimal(nums: number[], target: number): number {
  const memo = new Map<string, number>();

  function backtrack(index: number, currentSum: number): number {
    if (index === nums.length) {
      return currentSum === target ? 1 : 0;
    }
    const key = `${index},${currentSum}`;
    if (memo.has(key)) return memo.get(key)!;

    const add = backtrack(index + 1, currentSum + nums[index]);
    const sub = backtrack(index + 1, currentSum - nums[index]);
    const total = add + sub;
    memo.set(key, total);
    return total;
  }

  return backtrack(0, 0);
}

// Test cases
const tsw1 = findTargetSumWaysBrute([1, 1, 1, 1, 1], 3);
const tsw2 = findTargetSumWaysOptimal([1, 1, 1, 1, 1], 3);
if (tsw1 !== 5 || tsw2 !== 5) throw new Error("Expected 5 ways for target 3");
console.log("Target Sum Ways Backtracking passed!");
