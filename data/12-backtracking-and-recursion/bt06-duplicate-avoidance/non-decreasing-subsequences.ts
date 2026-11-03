/**
 * Pattern: Duplicate avoidance
 * Problem: Non-decreasing Subsequences (LeetCode 491)
 *
 * Given an integer array nums, find all the different possible non-decreasing subsequences
 * of the given array with at least two elements.
 */

// Brute Force: Enumerate all 2^n subsequences, filter valid ones, and deduplicate with Set
// Time: O(2^N * N), Space: O(2^N * N)
export function findSubsequencesBrute(nums: number[]): number[][] {
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
    if (sub.length >= 2) {
      let isNonDecreasing = true;
      for (let i = 1; i < sub.length; i++) {
        if (sub[i] < sub[i - 1]) {
          isNonDecreasing = false;
          break;
        }
      }
      if (isNonDecreasing) {
        const key = sub.join(",");
        if (!seen.has(key)) {
          seen.add(key);
          result.push(sub);
        }
      }
    }
  }
  return result;
}

// Optimal: Level-wise hash set for duplicate avoidance without pre-sorting nums
// Time: O(2^N), Space: O(N) recursion stack
export function findSubsequencesOptimal(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    if (current.length >= 2) {
      result.push([...current]);
    }

    const usedInLevel = new Set<number>();
    for (let i = start; i < nums.length; i++) {
      if (usedInLevel.has(nums[i])) continue;
      if (current.length > 0 && nums[i] < current[current.length - 1]) continue;

      usedInLevel.add(nums[i]);
      current.push(nums[i]);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const nds1 = findSubsequencesBrute([4, 6, 7, 7]);
const nds2 = findSubsequencesOptimal([4, 6, 7, 7]);
if (nds1.length !== nds2.length || nds2.length !== 8) throw new Error("Expected 8 subsequences");
console.log("Non-decreasing Subsequences passed!");
