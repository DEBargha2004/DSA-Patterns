/**
 * Pattern: Bit manipulation
 * Problem: Counting Bits (LeetCode 338)
 *
 * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n),
 * ans[i] is the number of 1's in the binary representation of i.
 */

// Brute Force: Calculate bits for each number independently
// Time: O(N log N), Space: O(1) auxiliary
export function countBitsBrute(n: number): number[] {
  const ans = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let val = i;
    while (val > 0) {
      val &= val - 1;
      count++;
    }
    ans[i] = count;
  }
  return ans;
}

// Optimal: DP with Bitwise Right Shift: ans[i] = ans[i >> 1] + (i & 1)
// Time: O(N), Space: O(1) auxiliary
export function countBitsOptimal(n: number): number[] {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}

// Test cases
const cb1 = countBitsBrute(5);
const cb2 = countBitsOptimal(5);
if (JSON.stringify(cb1) !== JSON.stringify(cb2) || cb2[5] !== 2) throw new Error("Mismatch in count bits");
console.log("Counting Bits passed!");
