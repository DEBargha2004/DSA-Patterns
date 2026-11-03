/**
 * Problem: Maximum Subarray (LeetCode 53)
 * Difficulty: Medium
 * Pattern: A9 - Kadane's algorithm
 *
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - tests all contiguous subarrays
// Space Complexity: O(1)
export function maxSubArrayBruteForce(nums: number[]): number {
  let maxSum = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;
    for (let j = i; j < nums.length; j++) {
      currentSum += nums[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  return maxSum;
}

// --- 2. Better Approach (Divide and Conquer) ---
// Time Complexity: O(n log n)
// Space Complexity: O(log n) recursion stack
export function maxSubArrayDivideAndConquer(nums: number[]): number {
  function helper(left: number, right: number): number {
    if (left === right) return nums[left];
    const mid = Math.floor((left + right) / 2);

    const leftMax = helper(left, mid);
    const rightMax = helper(mid + 1, right);

    // Crossing sum
    let leftCross = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      leftCross = Math.max(leftCross, sum);
    }

    let rightCross = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
      sum += nums[i];
      rightCross = Math.max(rightCross, sum);
    }

    return Math.max(leftMax, rightMax, leftCross + rightCross);
  }

  return helper(0, nums.length - 1);
}

// --- 3. Optimal Approach (Kadane's Algorithm) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// Invariant: currentSum = max(num, currentSum + num)
export function maxSubArrayOptimal(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// --- Test Verification ---
console.assert(maxSubArrayOptimal([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6, "Test 1 failed");
console.assert(maxSubArrayOptimal([1]) === 1, "Test 2 failed");
console.assert(maxSubArrayOptimal([5, 4, -1, 7, 8]) === 23, "Test 3 failed");
