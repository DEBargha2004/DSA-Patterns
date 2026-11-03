/**
 * Problem: 132 Pattern (LeetCode 456)
 * Difficulty: Medium
 * Pattern: SQ4 - Monotonic decreasing stack
 *
 * Given an array of n integers nums, return true if there is a 132 pattern in nums:
 * indices i < j < k such that nums[i] < nums[k] < nums[j].
 */

// --- Optimal Approach (Monotonic Decreasing Stack Traversing Right-to-Left) ---
// Maintain potential '2' values (nums[k]) as elements popped from stack of '3' values (nums[j])
// Time Complexity: O(n)
// Space Complexity: O(n)
export function find132pattern(nums: number[]): boolean {
  let s3 = -Infinity; // represents nums[k]
  const stack: number[] = []; // represents potential nums[j] (decreasing order)

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < s3) {
      return true; // found nums[i] < nums[k]
    }
    while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
      s3 = stack.pop()!;
    }
    stack.push(nums[i]);
  }

  return false;
}

// --- Test Verification ---
console.assert(find132pattern([1, 2, 3, 4]) === false, "Test 1 failed");
console.assert(find132pattern([3, 1, 4, 2]) === true, "Test 2 failed");
console.assert(find132pattern([-1, 3, 2, 0]) === true, "Test 3 failed");
console.assert(find132pattern([1, 0, 1, -4, -3]) === false, "Test 4 failed");
