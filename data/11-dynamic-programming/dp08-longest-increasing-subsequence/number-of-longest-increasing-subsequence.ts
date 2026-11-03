/**
 * Problem: Number of Longest Increasing Subsequence (LeetCode 673)
 * Difficulty: Medium
 * Pattern: DP8 - Longest increasing subsequence
 *
 * Find number of longest increasing subsequences.
 */

// --- Optimal Approach (DP maintaining lengths and counts) ---
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function findNumberOfLIS(nums: number[]): number {
  const n = nums.length;
  const length = new Array(n).fill(1);
  const count = new Array(n).fill(1);
  let maxLen = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1;
          count[i] = count[j];
        } else if (length[j] + 1 === length[i]) {
          count[i] += count[j];
        }
      }
    }
    maxLen = Math.max(maxLen, length[i]);
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    if (length[i] === maxLen) {
      total += count[i];
    }
  }

  return total;
}

// --- Test Verification ---
console.assert(findNumberOfLIS([1, 3, 5, 4, 7]) === 2, "Test 1 failed");
console.assert(findNumberOfLIS([2, 2, 2, 2, 2]) === 5, "Test 2 failed");
