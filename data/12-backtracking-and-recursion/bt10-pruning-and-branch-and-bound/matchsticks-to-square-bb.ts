/**
 * Pattern: Pruning and branch-and-bound
 * Problem: Matchsticks to Square (LeetCode 473)
 *
 * Given integer array matchsticks, return true if you can make this array into one square.
 * You cannot break any stick, each stick must be used exactly once.
 */

// Brute Force: Plain recursion trying each stick in 4 sides without sorting
// Time: O(4^N), Space: O(N)
export function makesquareBrute(matchsticks: number[]): boolean {
  const sum = matchsticks.reduce((a, b) => a + b, 0);
  if (sum % 4 !== 0) return false;
  const target = sum / 4;
  const sides = [0, 0, 0, 0];

  function dfs(index: number): boolean {
    if (index === matchsticks.length) {
      return sides[0] === target && sides[1] === target && sides[2] === target && sides[3] === target;
    }

    for (let i = 0; i < 4; i++) {
      if (sides[i] + matchsticks[index] <= target) {
        sides[i] += matchsticks[index];
        if (dfs(index + 1)) return true;
        sides[i] -= matchsticks[index];
      }
    }
    return false;
  }

  return dfs(0);
}

// Optimal: Branch-and-Bound: Sort descending, prune when bucket exceeds target, skip duplicate bucket sizes
// Time: O(4^(N / 4)), Space: O(N)
export function makesquareOptimal(matchsticks: number[]): boolean {
  const sum = matchsticks.reduce((a, b) => a + b, 0);
  if (sum % 4 !== 0) return false;
  const target = sum / 4;

  // Sort descending: larger sticks fail faster if impossible
  matchsticks.sort((a, b) => b - a);
  if (matchsticks[0] > target) return false;

  const sides = [0, 0, 0, 0];

  function dfs(index: number): boolean {
    if (index === matchsticks.length) return true;

    for (let i = 0; i < 4; i++) {
      if (sides[i] + matchsticks[index] > target) continue;

      // Branch-and-bound: if this bucket has the same sum as the previous bucket, trying it is redundant
      if (i > 0 && sides[i] === sides[i - 1]) continue;

      sides[i] += matchsticks[index];
      if (dfs(index + 1)) return true;
      sides[i] -= matchsticks[index];
    }
    return false;
  }

  return dfs(0);
}

// Test cases
if (!makesquareBrute([1,1,2,2,2]) || !makesquareOptimal([1,1,2,2,2])) throw new Error("Expected true for [1,1,2,2,2]");
if (makesquareOptimal([3,3,3,3,4])) throw new Error("Expected false for [3,3,3,3,4]");
console.log("Matchsticks to Square BB passed!");
