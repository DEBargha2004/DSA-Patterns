/**
 * Problem: Split Array Largest Sum (LeetCode 410)
 * Difficulty: Hard
 * Pattern: BS6 - Binary search on the answer
 *
 * Split nums into k non-empty subarrays such that the largest sum among them is minimized.
 */

// --- Optimal Approach (Binary Search over Maximum Subarray Sum) ---
// Time Complexity: O(n log(sum))
// Space Complexity: O(1)
export function splitArray(nums: number[], k: number): number {
  let left = Math.max(...nums);
  let right = nums.reduce((a, b) => a + b, 0);
  let ans = right;

  function canSplit(maxSum: number): boolean {
    let pieces = 1;
    let currentSum = 0;

    for (const x of nums) {
      if (currentSum + x > maxSum) {
        pieces++;
        currentSum = 0;
      }
      currentSum += x;
    }

    return pieces <= k;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canSplit(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(splitArray([7, 2, 5, 10, 8], 2) === 18, "Test 1 failed");
console.assert(splitArray([1, 2, 3, 4, 5], 2) === 9, "Test 2 failed");
