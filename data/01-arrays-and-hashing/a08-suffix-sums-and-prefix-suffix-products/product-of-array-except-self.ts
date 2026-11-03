/**
 * Problem: Product of Array Except Self (LeetCode 238)
 * Difficulty: Medium
 * Pattern: A8 - Suffix sums and prefix/suffix products
 *
 * Given an integer array nums, return an array answer such that answer[i] is equal
 * to the product of all the elements of nums except nums[i].
 * Solve without division and in O(n) time.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - computes product of all elements except index i
// Space Complexity: O(1) excluding output
export function productExceptSelfBruteForce(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    let prod = 1;
    for (let j = 0; j < n; j++) {
      if (i !== j) prod *= nums[j];
    }
    res[i] = prod;
  }
  return res;
}

// --- 2. Better Approach (Prefix and Suffix Product Arrays) ---
// Time Complexity: O(n) - 3 passes
// Space Complexity: O(n) - prefix and suffix arrays
export function productExceptSelfBetter(nums: number[]): number[] {
  const n = nums.length;
  const prefix = new Array<number>(n).fill(1);
  const suffix = new Array<number>(n).fill(1);
  const result = new Array<number>(n);

  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }
  for (let i = 0; i < n; i++) {
    result[i] = prefix[i] * suffix[i];
  }
  return result;
}

// --- 3. Optimal Approach (Single Output Array + Running Suffix Product) ---
// Time Complexity: O(n) - 2 passes
// Space Complexity: O(1) extra space (output array doesn't count towards space)
export function productExceptSelfOptimal(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array<number>(n);

  // Pass 1: compute prefix products directly into result
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  // Pass 2: maintain running suffix product from right
  let suffixProd = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffixProd;
    suffixProd *= nums[i];
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(productExceptSelfOptimal([1, 2, 3, 4])) === JSON.stringify([24, 12, 8, 6]), "Test failed");
