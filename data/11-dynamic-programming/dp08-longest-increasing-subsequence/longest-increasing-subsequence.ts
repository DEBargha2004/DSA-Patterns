/**
 * Problem: Longest Increasing Subsequence (LeetCode 300)
 * Difficulty: Medium
 * Pattern: DP8 - Longest increasing subsequence
 *
 * Find length of longest strictly increasing subsequence.
 */

// --- Brute Force / Standard DP ---
// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function lengthOfLISDP(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  let maxLen = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}

// --- Optimal Approach (Patience Sorting / Binary Search - O(n log n)) ---
// tails[i] stores smallest tail of all increasing subsequences of length i + 1.
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const x of nums) {
    let low = 0, high = tails.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (tails[mid] < x) low = mid + 1;
      else high = mid - 1;
    }

    if (low === tails.length) {
      tails.push(x);
    } else {
      tails[low] = x;
    }
  }

  return tails.length;
}

// --- Test Verification ---
console.assert(lengthOfLISDP([10, 9, 2, 5, 3, 7, 101, 18]) === 4, "DP failed");
console.assert(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) === 4, "Optimal 1 failed");
console.assert(lengthOfLIS([0, 1, 0, 3, 2, 3]) === 4, "Optimal 2 failed");
console.assert(lengthOfLIS([7, 7, 7, 7]) === 1, "Optimal 3 failed");
