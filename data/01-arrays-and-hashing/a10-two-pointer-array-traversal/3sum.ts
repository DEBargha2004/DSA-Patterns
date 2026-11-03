/**
 * Problem: 3Sum (LeetCode 15)
 * Difficulty: Medium
 * Pattern: A10 - Two-pointer array traversal
 *
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * The solution set must not contain duplicate triplets.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^3 log 3) with set deduplication
// Space Complexity: O(n) for set
export function threeSumBruteForce(nums: number[]): number[][] {
  const result: number[][] = [];
  const seen = new Set<string>();
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = triplet.join(',');
          if (!seen.has(key)) {
            seen.add(key);
            result.push(triplet);
          }
        }
      }
    }
  }

  return result;
}

// --- 2. Optimal Approach (Sort + Two Pointers with Deduplication) ---
// Time Complexity: O(n^2) - sorting takes O(n log n), two pointers take O(n) for each fixed element
// Space Complexity: O(1) extra space (ignoring output)
export function threeSumOptimal(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n - 2; i++) {
    // If the smallest number is > 0, three positive numbers cannot sum to 0
    if (nums[i] > 0) break;

    // Skip duplicates for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicate left values
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicate right values
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// --- Test Verification ---
const res = threeSumOptimal([-1, 0, 1, 2, -1, -4]);
console.assert(JSON.stringify(res) === JSON.stringify([[-1, -1, 2], [-1, 0, 1]]), "Test failed");
