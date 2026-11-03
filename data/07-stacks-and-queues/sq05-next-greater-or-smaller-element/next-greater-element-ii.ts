/**
 * Problem: Next Greater Element II (LeetCode 503)
 * Difficulty: Medium
 * Pattern: SQ5 - Next greater or smaller element
 *
 * Given a circular integer array nums, return the next greater number for every element.
 */

// --- Optimal Approach (Monotonic Stack over 2*n Circular Traversal) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function nextGreaterElements(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack: number[] = []; // stores indices

  for (let i = 0; i < 2 * n; i++) {
    const num = nums[i % n];
    while (stack.length > 0 && nums[stack[stack.length - 1]] < num) {
      const idx = stack.pop()!;
      res[idx] = num;
    }
    if (i < n) {
      stack.push(i);
    }
  }

  return res;
}

// --- Test Verification ---
console.assert(JSON.stringify(nextGreaterElements([1, 2, 1])) === JSON.stringify([2, -1, 2]), "Test 1 failed");
console.assert(JSON.stringify(nextGreaterElements([1, 2, 3, 4, 3])) === JSON.stringify([2, 3, 4, -1, 4]), "Test 2 failed");
