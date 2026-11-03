/**
 * Problem: Majority Element (LeetCode 169)
 * Difficulty: Easy
 * Pattern: A14 - Boyer–Moore majority vote
 *
 * Given an array nums of size n, return the majority element (> floor(n / 2) occurrences).
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
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

// --- 2. Optimal Approach (Boyer-Moore Voting Algorithm) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// Key invariant: pairs of differing elements cancel each other out.
// The majority element has count strictly greater than all other elements combined.
export function majorityElementBoyerMoore(nums: number[]): number {
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
console.assert(majorityElementBoyerMoore([3, 2, 3]) === 3, "Test 1 failed");
console.assert(majorityElementBoyerMoore([2, 2, 1, 1, 1, 2, 2]) === 2, "Test 2 failed");
