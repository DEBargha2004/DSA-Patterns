/**
 * Pattern: Bit manipulation
 * Problem: Single Number (LeetCode 136)
 *
 * Given a non-empty array of integers nums, every element appears twice except for one.
 * Find that single one.
 */

// Brute Force: Hash Set tracking element occurrences
// Time: O(N), Space: O(N)
export function singleNumberSet(nums: number[]): number {
  const set = new Set<number>();
  for (const n of nums) {
    if (set.has(n)) set.delete(n);
    else set.add(n);
  }
  return set.values().next().value!;
}

// Optimal: XOR Accumulation (a ^ a = 0, a ^ 0 = a)
// Time: O(N), Space: O(1)
export function singleNumberOptimal(nums: number[]): number {
  let xor = 0;
  for (const n of nums) {
    xor ^= n;
  }
  return xor;
}

// Test cases
const sn = [4, 1, 2, 1, 2];
if (singleNumberSet(sn) !== 4 || singleNumberOptimal(sn) !== 4) throw new Error("Expected 4");
console.log("Single Number passed!");
