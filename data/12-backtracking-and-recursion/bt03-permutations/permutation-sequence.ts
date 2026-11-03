/**
 * Pattern: Permutations
 * Problem: Permutation Sequence (LeetCode 60)
 *
 * Given n and k, return the k-th permutation sequence of numbers [1, ..., n].
 */

// Brute Force: Generate all permutations lexicographically until count reaches k
// Time: O(n! * n), Space: O(n)
export function getPermutationBrute(n: number, k: number): string {
  const numbers: number[] = [];
  for (let i = 1; i <= n; i++) numbers.push(i);

  let count = 0;
  let result = "";
  const used = new Array(n).fill(false);
  const current: number[] = [];

  function backtrack(): boolean {
    if (current.length === n) {
      count++;
      if (count === k) {
        result = current.join("");
        return true;
      }
      return false;
    }

    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(numbers[i]);
        if (backtrack()) return true;
        current.pop();
        used[i] = false;
      }
    }
    return false;
  }

  backtrack();
  return result;
}

// Optimal: Factorial Number System (Mathematical Selection)
// Time: O(n^2), Space: O(n)
export function getPermutationOptimal(n: number, k: number): string {
  const factorials: number[] = [1];
  for (let i = 1; i < n; i++) {
    factorials[i] = factorials[i - 1] * i;
  }

  const numbers: number[] = [];
  for (let i = 1; i <= n; i++) numbers.push(i);

  k--; // 0-indexed
  let result = "";

  for (let i = n - 1; i >= 0; i--) {
    const idx = Math.floor(k / factorials[i]);
    k %= factorials[i];
    result += numbers[idx];
    numbers.splice(idx, 1);
  }

  return result;
}

// Test cases
const ps1 = getPermutationBrute(3, 3);
const ps2 = getPermutationOptimal(3, 3);
if (ps1 !== "213" || ps2 !== "213") throw new Error(`Expected "213", got ${ps1} and ${ps2}`);
if (getPermutationOptimal(4, 9) !== "2314") throw new Error("Mismatch for (4, 9)");
console.log("Permutation Sequence passed!");
