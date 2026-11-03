/**
 * Problem: Find the Duplicate Number (LeetCode 287)
 * Difficulty: Medium
 * Pattern: LL4 - Cycle detection
 *
 * Array of n + 1 elements with values 1..n. Find the duplicate.
 */

// --- Optimal Approach (Floyd Cycle Entry) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function findDuplicate(nums: number[]): number {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  let p1 = nums[0];
  let p2 = slow;
  while (p1 !== p2) {
    p1 = nums[p1];
    p2 = nums[p2];
  }

  return p1;
}

// --- Test Verification ---
console.assert(findDuplicate([1, 3, 4, 2, 2]) === 2, "Test failed");
