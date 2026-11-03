/**
 * Pattern: Bit manipulation
 * Problem: Number of 1 Bits (LeetCode 191)
 *
 * Write a function that takes the binary representation of a positive integer
 * and returns the number of set bits it has (also known as Hamming weight).
 */

// Brute Force: Loop through all 32 bits one by one
// Time: O(32) = O(1), Space: O(1)
export function hammingWeightBrute(n: number): number {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if ((n & (1 << i)) !== 0) count++;
  }
  return count;
}

// Optimal: Brian Kernighan's Algorithm: n & (n - 1) clears lowest set bit
// Time: O(Number of set bits), Space: O(1)
export function hammingWeightOptimal(n: number): number {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1);
    count++;
  }
  return count;
}

// Test cases
if (hammingWeightBrute(11) !== 3 || hammingWeightOptimal(11) !== 3) throw new Error("Expected 3 for 11");
if (hammingWeightOptimal(128) !== 1) throw new Error("Expected 1 for 128");
console.log("Number of 1 Bits passed!");
