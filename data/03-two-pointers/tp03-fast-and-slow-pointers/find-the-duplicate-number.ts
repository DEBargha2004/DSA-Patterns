/**
 * Problem: Find the Duplicate Number (LeetCode 287)
 * Difficulty: Medium
 * Pattern: TP3 - Fast and slow pointers
 *
 * Array of n + 1 integers where each integer is in range [1, n]. Find the repeated number.
 */

// --- Optimal Approach (Floyd's Tortoise and Hare on Array as Linked List) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function findDuplicate(nums: number[]): number {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  let ptr1 = nums[0];
  let ptr2 = slow;
  while (ptr1 !== ptr2) {
    ptr1 = nums[ptr1];
    ptr2 = nums[ptr2];
  }

  return ptr1;
}

// --- Test Verification ---
console.assert(findDuplicate([1, 3, 4, 2, 2]) === 2, "Test 1 failed");
console.assert(findDuplicate([3, 1, 3, 4, 2]) === 3, "Test 2 failed");
