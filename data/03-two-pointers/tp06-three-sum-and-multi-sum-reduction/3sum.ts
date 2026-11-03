/**
 * Problem: 3Sum (LeetCode 15)
 * Difficulty: Medium
 * Pattern: TP6 - Three-sum and multi-sum reduction
 *
 * Return all triplets [nums[i], nums[j], nums[k]] such that their sum equals 0.
 */

// --- Optimal Approach (Sort + Fix First Element + Two Pointers with Deduplication) ---
// Time Complexity: O(n^2)
// Space Complexity: O(1) auxiliary
export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1, r = n - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }

  return result;
}

// --- Test Verification ---
const r = threeSum([-1, 0, 1, 2, -1, -4]);
console.assert(JSON.stringify(r) === JSON.stringify([[-1, -1, 2], [-1, 0, 1]]), "Test failed");
