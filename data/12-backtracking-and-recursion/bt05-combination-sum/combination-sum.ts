/**
 * Pattern: Combination sum
 * Problem: Combination Sum (LeetCode 39)
 *
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * The same number may be chosen unlimited times.
 */

// Brute Force: Recursive take-or-skip without sorting or early break
// Time: O(2^(target / min_candidate)), Space: O(target / min_candidate)
export function combinationSumBrute(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(index: number, sum: number): void {
    if (sum === target) {
      result.push([...current]);
      return;
    }
    if (sum > target || index === candidates.length) return;

    // Take current candidate and stay at index (unlimited reuse)
    current.push(candidates[index]);
    backtrack(index, sum + candidates[index]);
    current.pop();

    // Skip to next candidate
    backtrack(index + 1, sum);
  }

  backtrack(0, 0);
  return result;
}

// Optimal: Sort candidates and loop with early break pruning
// Time: O(N^(target / min_candidate)), Space: O(target / min_candidate)
export function combinationSumOptimal(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // Prune all larger candidates
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i]); // Re-use candidate i
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}

// Test cases
const cs1 = combinationSumBrute([2, 3, 6, 7], 7);
const cs2 = combinationSumOptimal([2, 3, 6, 7], 7);
if (cs1.length !== 2 || cs2.length !== 2) throw new Error("Expected 2 combinations for target 7");
console.log("Combination Sum passed!");
