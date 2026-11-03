/**
 * Problem: Check If a Number Is Majority Element in a Sorted Array (LeetCode 1150)
 * Difficulty: Easy
 * Pattern: A14 - Boyer–Moore majority vote
 *
 * Given an integer array nums sorted in non-decreasing order and an integer target,
 * return true if target is a majority element (appears > n / 2 times).
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n) - count occurrences
// Space Complexity: O(1)
export function isMajorityElementLinear(nums: number[], target: number): boolean {
  let count = 0;
  for (const x of nums) {
    if (x === target) count++;
  }
  return count > Math.floor(nums.length / 2);
}

// --- 2. Optimal Approach (Binary Search Lower Bound in Sorted Array) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
// Since array is sorted: find first occurrence of target using binary search.
// If target is majority, it must also be at index (firstIdx + floor(n / 2)).
export function isMajorityElementOptimal(nums: number[], target: number): boolean {
  const n = nums.length;
  const k = Math.floor(n / 2);

  // Find lower bound
  let left = 0;
  let right = n - 1;
  let firstIdx = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) {
      if (nums[mid] === target) firstIdx = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (firstIdx === -1) return false;

  const checkIdx = firstIdx + k;
  return checkIdx < n && nums[checkIdx] === target;
}

// --- Test Verification ---
console.assert(isMajorityElementOptimal([2, 4, 5, 5, 5, 5, 5, 6, 6], 5) === true, "Test 1 failed");
console.assert(isMajorityElementOptimal([10, 100, 101, 101], 101) === false, "Test 2 failed");
