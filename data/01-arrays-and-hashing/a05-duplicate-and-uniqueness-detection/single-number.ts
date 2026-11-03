/**
 * Problem: Single Number (LeetCode 136)
 * Difficulty: Easy
 * Pattern: A5 - Duplicate and uniqueness detection
 *
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 * Must implement a solution with linear runtime complexity and use only constant extra space.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function singleNumberBruteForce(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === nums[i]) count++;
    }
    if (count === 1) return nums[i];
  }
  return -1;
}

// --- 2. Better Approach (Hash Set) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function singleNumberSet(nums: number[]): number {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) {
      seen.delete(num);
    } else {
      seen.add(num);
    }
  }
  return Array.from(seen)[0];
}

// --- 3. Optimal Approach (Bitwise XOR) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
// Exploits properties: a ^ a = 0, a ^ 0 = a, and XOR is commutative & associative.
export function singleNumberOptimal(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

// --- Test Verification ---
console.assert(singleNumberOptimal([2, 2, 1]) === 1, "Test 1 failed");
console.assert(singleNumberOptimal([4, 1, 2, 1, 2]) === 4, "Test 2 failed");
