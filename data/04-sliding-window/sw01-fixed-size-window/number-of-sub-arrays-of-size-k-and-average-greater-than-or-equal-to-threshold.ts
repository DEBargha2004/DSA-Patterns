/**
 * Problem: Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold (LeetCode 1343)
 * Difficulty: Medium
 * Pattern: SW1 - Fixed-size window
 *
 * Given an array of integers arr and two integers k and threshold,
 * return the number of sub-arrays of size k and average >= threshold.
 */

// --- Optimal Approach (Fixed Window Sum >= k * threshold) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function numOfSubarrays(arr: number[], k: number, threshold: number): number {
  const targetSum = k * threshold;
  let currentSum = 0;
  let count = 0;

  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }
  if (currentSum >= targetSum) count++;

  for (let i = k; i < arr.length; i++) {
    currentSum += arr[i] - arr[i - k];
    if (currentSum >= targetSum) count++;
  }

  return count;
}

// --- Test Verification ---
console.assert(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4) === 3, "Test 1 failed");
console.assert(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5) === 6, "Test 2 failed");
