/**
 * Problem: 4Sum (LeetCode 18)
 * Difficulty: Medium
 * Pattern: TP6 - Three-sum and multi-sum reduction
 *
 * Return all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] that sum to target.
 */

// --- Optimal Approach (Sort + Two Nested Loops + Two Pointers) ---
// Time Complexity: O(n^3)
// Space Complexity: O(1) auxiliary
export function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let l = j + 1, r = n - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }

  return result;
}

// --- Test Verification ---
const res = fourSum([1, 0, -1, 0, -2, 2], 0);
console.assert(res.length === 3, "Test failed");
