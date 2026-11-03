/**
 * Problem: House Robber II (LeetCode 213)
 * Difficulty: Medium
 * Pattern: DP3 - One-dimensional DP
 *
 * Houses arranged in circle: first and last cannot be robbed together.
 */

// --- Optimal Approach (Run Linear Robber on nums[0...n-2] and nums[1...n-1]) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function robII(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  function robLinear(start: number, end: number): number {
    let prev2 = 0;
    let prev1 = 0;
    for (let i = start; i <= end; i++) {
      const curr = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }

  return Math.max(robLinear(0, nums.length - 2), robLinear(1, nums.length - 1));
}

// --- Test Verification ---
console.assert(robII([2, 3, 2]) === 3, "Test 1 failed");
console.assert(robII([1, 2, 3, 1]) === 4, "Test 2 failed");
console.assert(robII([1, 2, 3]) === 3, "Test 3 failed");
