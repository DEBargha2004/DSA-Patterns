/**
 * Pattern: Subsets
 * Problem: Subsets II (LeetCode 90)
 *
 * Given an integer array nums that may contain duplicates, return all possible
 * subsets (the power set) without duplicate subsets.
 */

// Brute Force: Generate all subsets, serialize with sort, deduplicate using a Set
// Time: O(2^N * N log N), Space: O(2^N * N)
export function subsetsWithDupBrute(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const seen = new Set<string>();
  const result: number[][] = [];

  for (let mask = 0; mask < (1 << n); mask++) {
    const sub: number[] = [];
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        sub.push(nums[i]);
      }
    }
    const key = sub.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      result.push(sub);
    }
  }
  return result;
}

// Optimal: Sort first, skip adjacent duplicate elements at the same tree depth
// Time: O(2^N * N), Space: O(N) recursion stack
export function subsetsWithDupOptimal(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      // If same value as previous sibling at this level, skip
      if (i > start && nums[i] === nums[i - 1]) continue;

      current.push(nums[i]);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const rDup1 = subsetsWithDupBrute([1, 2, 2]);
const rDup2 = subsetsWithDupOptimal([1, 2, 2]);
if (rDup1.length !== 6 || rDup2.length !== 6) throw new Error("Expected 6 subsets for [1, 2, 2]");
console.log("Subsets II passed!");
