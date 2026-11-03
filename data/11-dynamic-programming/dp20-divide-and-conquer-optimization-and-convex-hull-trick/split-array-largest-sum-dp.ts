/**
 * Problem: Split Array Largest Sum via DP (LeetCode 410)
 * Difficulty: Hard
 * Pattern: DP20 - Divide-and-conquer optimization and convex hull trick
 *
 * Split array into k subarrays minimizing the maximum sum.
 */

// --- Optimal Approach (2D DP / Binary Search) ---
// Time Complexity: O(n * log(sum))
// Space Complexity: O(1)
export function splitArray(nums: number[], k: number): number {
  let low = Math.max(...nums);
  let high = nums.reduce((a, b) => a + b, 0);

  function countSubarrays(maxAllowed: number): number {
    let pieces = 1;
    let curSum = 0;
    for (const x of nums) {
      if (curSum + x > maxAllowed) {
        pieces++;
        curSum = x;
      } else {
        curSum += x;
      }
    }
    return pieces;
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (countSubarrays(mid) <= k) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// --- Test Verification ---
console.assert(splitArray([7, 2, 5, 10, 8], 2) === 18, "Test 1 failed ([7,2,5] and [10,8])");
console.assert(splitArray([1, 2, 3, 4, 5], 2) === 9, "Test 2 failed");
console.assert(splitArray([1, 4, 4], 3) === 4, "Test 3 failed");
