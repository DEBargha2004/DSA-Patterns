/**
 * Pattern: Combination sum
 * Problem: Combination Sum II (LeetCode 40)
 *
 * Given a collection of candidate numbers (candidates) and a target number (target),
 * find all unique combinations where candidate numbers sum to target.
 * Each number in candidates may only be used once.
 */

// Brute Force: Generate all subsets with sum check, deduplicate via string set
// Time: O(2^N * N), Space: O(2^N * N)
export function combinationSum2Brute(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  const seen = new Set<string>();
  const path: number[] = [];

  function backtrack(index: number, sum: number): void {
    if (sum === target) {
      const key = path.join(",");
      if (!seen.has(key)) {
        seen.add(key);
        result.push([...path]);
      }
      return;
    }
    if (sum > target || index === candidates.length) return;

    path.push(candidates[index]);
    backtrack(index + 1, sum + candidates[index]);
    path.pop();

    backtrack(index + 1, sum);
  }

  backtrack(0, 0);
  return result;
}

// Optimal: Sort + Loop-based recursion skipping duplicate values at same level
// Time: O(2^N), Space: O(N) recursion stack
export function combinationSum2Optimal(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // Prune
      if (i > start && candidates[i] === candidates[i - 1]) continue; // Skip duplicates at current level

      path.push(candidates[i]);
      backtrack(i + 1, remaining - candidates[i]);
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}

// Test cases
const cs2_1 = combinationSum2Brute([10, 1, 2, 7, 6, 1, 5], 8);
const cs2_2 = combinationSum2Optimal([10, 1, 2, 7, 6, 1, 5], 8);
if (cs2_1.length !== 4 || cs2_2.length !== 4) throw new Error("Expected 4 unique combinations for target 8");
console.log("Combination Sum II passed!");
