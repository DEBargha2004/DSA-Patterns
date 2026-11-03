/**
 * Problem: Majority Element (LeetCode 169)
 * Difficulty: Easy
 * Pattern: A3 - Frequency counting
 *
 * Given an array nums of size n, return the majority element (element appearing > n / 2 times).
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - count occurrences of each element
// Space Complexity: O(1)
export function majorityElementBruteForce(nums: number[]): number {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (nums[j] === nums[i]) count++;
    }
    if (count > Math.floor(n / 2)) return nums[i];
  }
  return -1;
}

// --- 2. Better Approach (Hash Map Frequency Counting) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function majorityElementHashMap(nums: number[]): number {
  const freq = new Map<number, number>();
  const threshold = Math.floor(nums.length / 2);

  for (const num of nums) {
    const count = (freq.get(num) ?? 0) + 1;
    if (count > threshold) return num;
    freq.set(num, count);
  }

  return -1;
}

// --- 3. Optimal Approach (Boyer-Moore Voting Algorithm) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function majorityElementOptimal(nums: number[]): number {
  let candidate = nums[0];
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }

  return candidate;
}

// --- Test Verification ---
console.assert(majorityElementOptimal([3, 2, 3]) === 3, "Test 1 failed");
console.assert(majorityElementOptimal([2, 2, 1, 1, 1, 2, 2]) === 2, "Test 2 failed");
