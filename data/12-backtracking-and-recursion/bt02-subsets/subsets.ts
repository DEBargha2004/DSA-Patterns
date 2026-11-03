/**
 * Pattern: Subsets
 * Problem: Subsets (LeetCode 78)
 *
 * Given an integer array nums of unique elements, return all possible subsets (the power set).
 */

// Brute Force: Bit Manipulation
// Time: O(2^N * N), Space: O(2^N * N)
export function subsetsBitmask(nums: number[]): number[][] {
  const n = nums.length;
  const total = 1 << n;
  const result: number[][] = [];

  for (let mask = 0; mask < total; mask++) {
    const sub: number[] = [];
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        sub.push(nums[i]);
      }
    }
    result.push(sub);
  }
  return result;
}

// Optimal: Recursive Backtracking (Cascading / DFS)
// Time: O(2^N * N), Space: O(N) auxiliary recursion stack
export function subsetsOptimal(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const s1 = subsetsBitmask([1, 2, 3]);
const s2 = subsetsOptimal([1, 2, 3]);
if (s1.length !== 8 || s2.length !== 8) throw new Error("Expected 8 subsets for 3 elements");
console.log("Subsets passed!");
