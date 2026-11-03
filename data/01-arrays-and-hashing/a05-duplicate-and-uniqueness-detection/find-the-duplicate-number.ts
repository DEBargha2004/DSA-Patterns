/**
 * Problem: Find the Duplicate Number (LeetCode 287)
 * Difficulty: Medium
 * Pattern: A5 - Duplicate and uniqueness detection
 *
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
 * There is only one repeated number in nums, return this repeated number.
 * Must not modify the array and must use O(1) extra space.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function findDuplicateBruteForce(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return nums[i];
    }
  }
  return -1;
}

// --- 2. Better Approach (Hash Set) ---
// Time Complexity: O(n)
// Space Complexity: O(n) - violates O(1) space constraint
export function findDuplicateSet(nums: number[]): number {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
  return -1;
}

// --- 3. Optimal Approach (Floyd's Tortoise and Hare / Cycle Detection) ---
// Time Complexity: O(n)
// Space Complexity: O(1) - meets all problem constraints
// Interprets array as a linked list where value represents pointer to next node index.
export function findDuplicateOptimal(nums: number[]): number {
  let slow = nums[0];
  let fast = nums[0];

  // Phase 1: Detect cycle
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find cycle entrance
  let ptr1 = nums[0];
  let ptr2 = slow;
  while (ptr1 !== ptr2) {
    ptr1 = nums[ptr1];
    ptr2 = nums[ptr2];
  }

  return ptr1;
}

// --- Test Verification ---
console.assert(findDuplicateOptimal([1, 3, 4, 2, 2]) === 2, "Test 1 failed");
console.assert(findDuplicateOptimal([3, 1, 3, 4, 2]) === 3, "Test 2 failed");
