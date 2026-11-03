/**
 * Problem: 3Sum Closest (LeetCode 16)
 * Difficulty: Medium
 * Pattern: TP6 - Three-sum and multi-sum reduction
 *
 * Find three integers in nums such that the sum is closest to target. Return the sum.
 */

// --- Optimal Approach (Sort + Two Pointers Absolute Difference Minimization) ---
// Time Complexity: O(n^2)
// Space Complexity: O(1) auxiliary
export function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let closestSum = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    let l = i + 1, r = nums.length - 1;

    while (l < r) {
      const currentSum = nums[i] + nums[l] + nums[r];

      if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
        closestSum = currentSum;
      }

      if (currentSum < target) {
        l++;
      } else if (currentSum > target) {
        r--;
      } else {
        return target;
      }
    }
  }

  return closestSum;
}

// --- Test Verification ---
console.assert(threeSumClosest([-1, 2, 1, -4], 1) === 2, "Test 1 failed");
console.assert(threeSumClosest([0, 0, 0], 1) === 0, "Test 2 failed");
