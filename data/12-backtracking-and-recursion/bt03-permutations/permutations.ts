/**
 * Pattern: Permutations
 * Problem: Permutations (LeetCode 46)
 *
 * Given an array nums of distinct integers, return all the possible permutations.
 */

// Brute Force: Array inclusion check / visited set
// Time: O(N! * N), Space: O(N) visited set + call stack
export function permuteVisited(nums: number[]): number[][] {
  const result: number[][] = [];
  const visited = new Set<number>();
  const current: number[] = [];

  function backtrack(): void {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (const num of nums) {
      if (!visited.has(num)) {
        visited.add(num);
        current.push(num);
        backtrack();
        current.pop();
        visited.delete(num);
      }
    }
  }

  backtrack();
  return result;
}

// Optimal: In-place Swapping
// Time: O(N! * N), Space: O(N) recursion stack (no auxiliary visited set)
export function permuteInPlace(nums: number[]): number[][] {
  const result: number[][] = [];
  const arr = [...nums];

  function backtrack(first: number): void {
    if (first === arr.length) {
      result.push([...arr]);
      return;
    }

    for (let i = first; i < arr.length; i++) {
      // Swap arr[first] and arr[i]
      [arr[first], arr[i]] = [arr[i], arr[first]];
      backtrack(first + 1);
      // Backtrack
      [arr[first], arr[i]] = [arr[i], arr[first]];
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const p1 = permuteVisited([1, 2, 3]);
const p2 = permuteInPlace([1, 2, 3]);
if (p1.length !== 6 || p2.length !== 6) throw new Error("Expected 6 permutations");
console.log("Permutations passed!");
