/**
 * Problem: Sum of Subarray Minimums (LeetCode 907)
 * Difficulty: Medium
 * Pattern: SQ3 - Monotonic increasing stack
 *
 * Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr.
 * Return answer modulo 10^9 + 7.
 */

// --- Optimal Approach (Monotonic Increasing Stack: PLE & NLE) ---
// PLE = Previous Less Element, NLE = Next Less Element
// Time Complexity: O(n)
// Space Complexity: O(n)
export function sumSubarrayMins(arr: number[]): number {
  const MOD = 1_000_000_007;
  const n = arr.length;
  const left = new Array(n).fill(0);
  const right = new Array(n).fill(0);

  // Stack for Previous Less Element (strictly less)
  const stackPLE: number[] = [];
  for (let i = 0; i < n; i++) {
    while (stackPLE.length > 0 && arr[stackPLE[stackPLE.length - 1]] >= arr[i]) {
      stackPLE.pop();
    }
    left[i] = stackPLE.length === 0 ? i + 1 : i - stackPLE[stackPLE.length - 1];
    stackPLE.push(i);
  }

  // Stack for Next Less Element (less than or equal to avoid double count)
  const stackNLE: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stackNLE.length > 0 && arr[stackNLE[stackNLE.length - 1]] > arr[i]) {
      stackNLE.pop();
    }
    right[i] = stackNLE.length === 0 ? n - i : stackNLE[stackNLE.length - 1] - i;
    stackNLE.push(i);
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    total = (total + arr[i] * left[i] * right[i]) % MOD;
  }

  return total;
}

// --- Test Verification ---
console.assert(sumSubarrayMins([3, 1, 2, 4]) === 17, "Test 1 failed");
console.assert(sumSubarrayMins([11, 81, 94, 43, 3]) === 444, "Test 2 failed");
