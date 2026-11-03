/**
 * Pattern: Permutations
 * Problem: Permutations II (LeetCode 47)
 *
 * Given a collection of numbers, nums, that might contain duplicates, return all
 * possible unique permutations in any order.
 */

// Brute Force: Generate all permutations and deduplicate via string serialization
// Time: O(N! * N), Space: O(N! * N)
export function permuteUniqueBrute(nums: number[]): number[][] {
  const result: number[][] = [];
  const seen = new Set<string>();
  const used = new Array(nums.length).fill(false);
  const current: number[] = [];

  function backtrack(): void {
    if (current.length === nums.length) {
      const key = current.join(",");
      if (!seen.has(key)) {
        seen.add(key);
        result.push([...current]);
      }
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      current.push(nums[i]);
      backtrack();
      current.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// Optimal: Sort first + visited boolean array with pruning condition
// nums[i] === nums[i - 1] && !used[i - 1] enforces that identical values are picked in order
// Time: O(N! * N), Space: O(N) auxiliary
export function permuteUniqueOptimal(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const used = new Array(nums.length).fill(false);
  const current: number[] = [];

  function backtrack(): void {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      // Skip duplicate if previous identical item hasn't been chosen in this branch
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      current.push(nums[i]);
      backtrack();
      current.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// Test cases
const pu1 = permuteUniqueBrute([1, 1, 2]);
const pu2 = permuteUniqueOptimal([1, 1, 2]);
if (pu1.length !== 3 || pu2.length !== 3) throw new Error("Expected 3 unique permutations for [1,1,2]");
console.log("Permutations II passed!");
